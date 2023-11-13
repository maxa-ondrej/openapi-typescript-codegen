import { EOL } from 'os';
import { resolve } from 'path';

import { HttpClient } from '../HttpClient';
import { Indent } from '../Indent';
import type { Client } from '../client/interfaces/Client';
import { exists, writeFile } from './fileSystem';
import type { Templates } from './registerHandlebarTemplates';
import { writeClientCore } from './writeClientCore';

jest.mock('./fileSystem');

describe('writeClientCore', () => {
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

    // @ts-ignore
    exists.mockReturnValue(true);
    await writeClientCore(client, templates, '/', HttpClient.FETCH, Indent.SPACE_4, 'MyClient');

    expect(writeFile).toBeCalledWith(resolve('/', '/OpenAPI.ts'), `settings${EOL}`);
    expect(writeFile).toBeCalledWith(resolve('/', '/HttpError.ts'), `httpError${EOL}`);
    expect(writeFile).toBeCalledWith(resolve('/', '/ApiRequestOptions.ts'), `apiRequestOptions${EOL}`);
    expect(writeFile).toBeCalledWith(resolve('/', '/ApiResponse.ts'), `apiResponse${EOL}`);
    expect(writeFile).toBeCalledWith(resolve('/', '/ApiResult.ts'), `apiResult${EOL}`);
    expect(writeFile).toBeCalledWith(resolve('/', '/request.ts'), `request${EOL}`);

    // @ts-ignore
    exists.mockReturnValue(true);
    await writeClientCore(client, templates, '/', HttpClient.FETCH, Indent.SPACE_4, 'MyClient', 'request-copy.ts');

    expect(writeFile).toBeCalledWith(resolve('/', '/OpenAPI.ts'), `settings${EOL}`);
    expect(writeFile).toBeCalledWith(resolve('/', '/ApiRequestOptions.ts'), `apiRequestOptions${EOL}`);
    expect(writeFile).toBeCalledWith(resolve('/', '/ApiResponse.ts'), `apiResponse${EOL}`);
    expect(writeFile).toBeCalledWith(resolve('/', '/ApiResult.ts'), `apiResult${EOL}`);
    expect(writeFile).toBeCalledWith(resolve('/', '/request.ts'), `request${EOL}`);
    expect(writeFile).toBeCalledWith(resolve('/', '/HttpError.ts'), `httpError${EOL}`);
    expect(writeFile).toBeCalledWith(resolve('/', '/BaseHttpRequest.ts'), `baseHttpRequest${EOL}`);
    expect(writeFile).toBeCalledWith(resolve('/', '/FetchHttpRequest.ts'), `httpRequest${EOL}`);

    // @ts-ignore
    exists.mockReturnValue(false);
    await expect(() =>
      writeClientCore(client, templates, '/', HttpClient.FETCH, Indent.SPACE_4, 'MyClient', 'request-copy.ts'),
    ).rejects.toThrowError(
      new Error(`Custom request file "${resolve(process.cwd(), './request-copy.ts')}" does not exists`),
    );
  });
});
