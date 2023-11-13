import type { Model } from '../../../client/interfaces/Model';
import type { OperationResponse } from '../../../client/interfaces/OperationResponse';

const areEqual = (a: Model, b: Model): boolean => {
  const equal = a.type === b.type && a.base === b.base && a.template === b.template;
  if (equal && a.link && b.link) {
    return areEqual(a.link, b.link);
  }
  return equal;
};

export const getOperationResults = (operationResults: OperationResponse[]): OperationResponse[] => {
  return operationResults.length === 0
    ? [
        {
          in: 'response',
          name: '',
          code: 0,
          description: '',
          export: 'generic',
          type: 'void',
          base: 'void',
          template: null,
          link: null,
          isDefinition: false,
          isReadOnly: false,
          isRequired: false,
          isNullable: false,
          imports: [],
          enum: [],
          enums: [],
          properties: [],
        },
      ]
    : operationResults.map(($) =>
        $.code === 204
          ? {
              in: 'response',
              name: '',
              code: 204,
              description: '',
              export: 'generic',
              type: 'void',
              base: 'void',
              template: null,
              link: null,
              isDefinition: false,
              isReadOnly: false,
              isRequired: false,
              isNullable: false,
              imports: [],
              enum: [],
              enums: [],
              properties: [],
            }
          : $,
      );
};
