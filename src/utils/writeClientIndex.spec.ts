import { resolve } from 'path';

import type { Client } from '../client/interfaces/Client';
import { writeFile } from './fileSystem';
import type { Templates } from './registerHandlebarTemplates';
import { writeClientIndex } from './writeClientIndex';

jest.mock('./fileSystem');

describe('writeClientIndex', () => {
  it('should write to filesystem', async () => {
    const client: Client = {
      server: 'http://localhost:8080',
      version: '1.0',
      models: [],
      services: [],
    };

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
        baseHttpRequest: () => 'baseHttpRequest',
        httpError: () => 'httpError',
        httpRequest: () => 'httpRequest',
      },
    };

    await writeClientIndex(client, templates, '/', true, true, true, true, 'Service', '');

    expect(writeFile).toBeCalledWith(resolve('/', '/index.ts'), 'index');
  });
});
