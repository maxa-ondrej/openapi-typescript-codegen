import type { Operation } from '../../../client/interfaces/Operation';
import type { OperationParameters } from '../../../client/interfaces/OperationParameters';
import type { OpenApi } from '../interfaces/OpenApi';
import type { OpenApiOperation } from '../interfaces/OpenApiOperation';
import { getOperationName } from './getOperationName';
import { getOperationParameters } from './getOperationParameters';
import { getOperationResponseHeader } from './getOperationResponseHeader';
import { getOperationResponses } from './getOperationResponses';
import { getOperationResults } from './getOperationResults';
import { getServiceName } from './getServiceName';
import { sortByRequired } from './sortByRequired';

export const getOperation = (
  openApi: OpenApi,
  url: string,
  method: string,
  tag: string,
  op: OpenApiOperation,
  pathParams: OperationParameters,
): Operation => {
  const serviceName = getServiceName(tag);
  const operationName = getOperationName(url, method, op.operationId);

  // Create a new operation object for this method.
  const operation: Operation = {
    service: serviceName,
    name: operationName,
    summary: op.summary || null,
    description: op.description || null,
    deprecated: op.deprecated === true,
    method: method.toUpperCase(),
    path: url,
    parameters: [...pathParams.parameters],
    parametersPath: [...pathParams.parametersPath],
    parametersQuery: [...pathParams.parametersQuery],
    parametersForm: [...pathParams.parametersForm],
    parametersHeader: [...pathParams.parametersHeader],
    parametersCookie: [...pathParams.parametersCookie],
    parametersBody: pathParams.parametersBody,
    imports: [],
    results: [],
    responseHeader: null,
  };

  // Parse the operation parameters (path, query, body, etc).
  if (op.parameters) {
    const parameters = getOperationParameters(openApi, op.parameters);
    operation.imports.push(...parameters.imports);
    operation.parameters.push(...parameters.parameters);
    operation.parametersPath.push(...parameters.parametersPath);
    operation.parametersQuery.push(...parameters.parametersQuery);
    operation.parametersForm.push(...parameters.parametersForm);
    operation.parametersHeader.push(...parameters.parametersHeader);
    operation.parametersCookie.push(...parameters.parametersCookie);
    operation.parametersBody = parameters.parametersBody;
  }

  // Parse the operation responses.
  if (op.responses) {
    const operationResponses = getOperationResponses(openApi, op.responses);
    const operationResults = getOperationResults(operationResponses);
    operation.responseHeader = getOperationResponseHeader(operationResults);

    const types = {
      'application/json': 1,
      'x-www-form-urlencoded': 2,
      'application/xml': 3,
    } as const;

    operationResults
      .sort((a, b) => (types[a.type as keyof typeof types] ?? 4) - (types[b.type as keyof typeof types] ?? 4))
      .filter(($, i1, arr) => arr.filter(({ code }, i2) => i1 > i2 && code === $.code).length === 0)
      .sort((a, b) => a.code - b.code)
      .forEach((operationResult) => {
        operation.results.push(operationResult);
        operation.imports.push(...operationResult.imports);
      });
  }

  operation.parameters = operation.parameters.sort(sortByRequired);

  return operation;
};
