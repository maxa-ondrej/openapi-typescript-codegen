import { EOL } from 'os';
import { resolve } from 'path';

import { HttpClient } from '../HttpClient';
import { Indent } from '../Indent';
import type { Service } from '../client/interfaces/Service';
import { writeFile } from './fileSystem';
import type { Templates } from './registerHandlebarTemplates';
import { writeClientServices } from './writeClientServices';

jest.mock('./fileSystem');

describe('writeClientServices', () => {
  it('should write to filesystem', async () => {
    const services: Service[] = [
      {
        name: 'User',
        operations: [],
        imports: [],
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
        apiError: () => 'apiError',
        apiRequestOptions: () => 'apiRequestOptions',
        apiResponse: () => 'apiResponse',
        apiResult: () => 'apiResult',
        request: () => 'request',
        baseHttpRequest: () => 'baseHttpRequest',
        httpRequest: () => 'httpRequest',
      },
    };

    await writeClientServices(services, templates, '/', HttpClient.FETCH, false, Indent.SPACE_4, 'Service');

    expect(writeFile).toBeCalledWith(resolve('/', '/UserService.ts'), `service${EOL}`);
  });
});
