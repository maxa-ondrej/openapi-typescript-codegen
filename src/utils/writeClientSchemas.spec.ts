import { EOL } from 'os';
import { resolve } from 'path';

import { HttpClient } from '../HttpClient';
import { Indent } from '../Indent';
import type { Model } from '../client/interfaces/Model';
import { writeFile } from './fileSystem';
import type { Templates } from './registerHandlebarTemplates';
import { writeClientSchemas } from './writeClientSchemas';

jest.mock('./fileSystem');

describe('writeClientSchemas', () => {
  it('should write to filesystem', async () => {
    const models: Model[] = [
      {
        export: 'interface',
        name: 'User',
        type: 'User',
        base: 'User',
        template: null,
        link: null,
        description: null,
        isDefinition: true,
        isReadOnly: false,
        isRequired: false,
        isNullable: false,
        imports: [],
        enum: [],
        enums: [],
        properties: [],
      },
    ];

    const templates: Templates = {
      index: () => 'index',
      client: () => 'client',
      exports: {
        model: () => 'model',
        schema: () => 'schema',
        service: () => 'service',
      },
      core: {
        settings: () => 'settings',
        apiRequestOptions: () => 'apiRequestOptions',
        apiResponse: () => 'apiResponse',
        apiResult: () => 'apiResult',
        request: () => 'request',
        response: () => 'response',
        sse: () => 'sse',
        baseHttpRequest: () => 'baseHttpRequest',
        httpError: () => 'httpError',
        httpRequest: () => 'httpRequest',
      },
    };

    await writeClientSchemas(models, templates, '/', HttpClient.FETCH, Indent.SPACE_4);

    expect(writeFile).toBeCalledWith(resolve('/', '/$User.ts'), `schema${EOL}`);
  });
});
