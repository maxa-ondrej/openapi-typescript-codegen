import OpenAPI from './index';
import * as Writer from './utils/writeClient';

const mock = jest.spyOn(Writer, 'writeClient');

describe('index', () => {
  it('parses v2 without issues', async () => {
    await OpenAPI.generate({
      input: './test/spec/v2.json',
      output: './generated/v2/',
      write: false,
    });
  });

  it('parses v3 without issues', async () => {
    await OpenAPI.generate({
      input: './test/spec/v3.json',
      output: './generated/v3/',
      write: false,
    });
  });

  it('downloads and parses v2 without issues', async () => {
    await OpenAPI.generate({
      input: 'https://raw.githubusercontent.com/ferdikoomen/openapi-typescript-codegen/master/test/spec/v2.json',
      output: './generated/v2-downloaded/',
      write: false,
    });
  });

  it('downloads and parses v3 without issues', async () => {
    await OpenAPI.generate({
      input: 'https://raw.githubusercontent.com/ferdikoomen/openapi-typescript-codegen/master/test/spec/v3.json',
      output: './generated/v3-downloaded/',
      write: false,
    });
  });
  it('parses and writes v2 without issues', async () => {
    mock.mockClear();
    mock.mockImplementation(() => Promise.resolve());
    await OpenAPI.generate({
      input: './test/spec/v2.json',
      output: './generated/v2/',
    });
    expect(mock).toBeCalledTimes(1);
  });

  it('parses and writes v3 without issues', async () => {
    mock.mockClear();
    mock.mockImplementation(() => Promise.resolve());
    await OpenAPI.generate({
      input: './test/spec/v3.json',
      output: './generated/v3/',
    });
    expect(mock).toBeCalledTimes(1);
  });

  it('fails with wrong input', async () => {
    await expect(() =>
      OpenAPI.generate({
        input: { test: 1 },
        output: './generated/v3/',
      }),
    ).rejects.toThrowError('Unsupported Open API version: "undefined"');
  });
});
