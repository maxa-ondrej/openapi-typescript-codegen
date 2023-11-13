import { HttpClient } from '../HttpClient';
import { Indent } from '../Indent';
import type { Client } from '../client/interfaces/Client';
import { mkdir, rmdir, writeFile } from './fileSystem';
import type { Templates } from './registerHandlebarTemplates';
import { writeClient } from './writeClient';

jest.mock('./fileSystem');

describe('writeClient', () => {
  it('should write to filesystem', async () => {
    const client: Client = {
      server: 'http://localhost:8080',
      version: 'v1',
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
        apiError: () => 'apiError',
        apiRequestOptions: () => 'apiRequestOptions',
        apiResponse: () => 'apiResponse',
        apiResult: () => 'apiResult',
        request: () => 'request',
        baseHttpRequest: () => 'baseHttpRequest',
        httpRequest: () => 'httpRequest',
      },
    };

    await writeClient(
      client,
      templates,
      './dist',
      HttpClient.FETCH,
      false,
      true,
      true,
      true,
      true,
      Indent.SPACE_4,
      'Service',
      'AppClient',
    );

    expect(rmdir).toBeCalled();
    expect(mkdir).toBeCalled();
    expect(writeFile).toBeCalled();
  });
});
