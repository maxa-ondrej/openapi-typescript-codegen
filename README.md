# OpenAPI Typescript Codegen

[![NPM][npm-image]][npm-url]
[![License][license-image]][license-url]
[![Coverage][coverage-image]][coverage-url]
[![Coverage][coverage-image]][coverage-url]
[![Downloads][downloads-image]][downloads-url]
[![Build][build-image]][build-url]

> Node.js library that generates Typescript clients based on the OpenAPI specification.

## Why?
- Frontend ❤️ OpenAPI, but we do not want to use JAVA codegen in our builds
- Quick, lightweight, robust and framework-agnostic 🚀
- Supports generation of TypeScript clients
- Supports generations of Fetch, Node-Fetch, Axios, Angular and XHR http clients
- Supports OpenAPI specification v2.0 and v3.0
- Supports JSON and YAML files for input
- Supports generation through CLI, Node.js and NPX
- Supports tsc and @babel/plugin-transform-typescript
- Supports aborting of requests (cancelable promise pattern)
- Supports external references using [json-schema-ref-parser](https://github.com/APIDevTools/json-schema-ref-parser/)

## Install

```
pnpm install @majkit/openapi -D
```

## Usage

```
$ openapi --help

  Usage: openapi [options]

  Options:
    -V, --version             output the version number
    -i, --input <value>       OpenAPI specification, can be a path, url or string content (required)
    -o, --output <value>      Output directory (required)
    -c, --client <value>      HTTP client to generate [fetch, xhr, node, axios] (default: "fetch")
    --name <value>            Custom client class name
    --useOptions              Use options instead of arguments
    --exportCore <value>      Write core files to disk (default: true)
    --exportServices <value>  Write services to disk (default: true)
    --exportModels <value>    Write models to disk (default: true)
    --exportSchemas <value>   Write schemas to disk (default: false)
    --indent <value>          Indentation options [4, 2, tab] (default: "4")
    --postfixServices         Service name postfix (default: "Service")
    --postfixModels           Model name postfix
    --request <value>         Path to custom request file
    -h, --help                display help for command

  Examples
    $ openapi --input ./spec.json --output ./generated
    $ openapi --input ./spec.json --output ./generated --client xhr
```

## Docker usage

To build the Docker container, execute the following command:

```
docker build . --tag openapi-typescript-codegen
```

After this is done, you can execute the CLI commands:

```
docker run openapi-typescript-codegen --help
docker run openapi-typescript-codegen --input sample.yaml --output client
```

Documentation
===
- [Basic usage](docs/basic-usage.md)
- [OpenAPI object](docs/openapi-object.md)
- [Client instances](docs/client-instances.md) `--name`
- [Argument vs. Object style](docs/arguments-vs-object-style.md) `--useOptions`
- [Runtime schemas](docs/runtime-schemas.md) `--exportSchemas`
- [Enum with custom names and descriptions](docs/custom-enums.md)
- [Nullable props (OpenAPI v2)](docs/nullable-props.md)
- [Authorization](docs/authorization.md)
- [External references](docs/external-references.md)
- [Canceling requests](docs/canceling-requests.md)
- [Custom request file](docs/custom-request-file.md)

Support
===
- [Babel support](docs/babel-support.md)
- [Axios support](docs/axios-support.md)
- [Node-Fetch support](docs/node-fetch-support.md)

[npm-url]: https://npmjs.org/package/@majkit/openapi
[npm-image]: https://img.shields.io/npm/v/@majkit/openapi.svg
[license-url]: LICENSE
[license-image]: http://img.shields.io/npm/l/@majkit/openapi.svg
[coverage-url]: https://codecov.io/gh/maxa-ondrej/openapi-typescript-codegen
[coverage-image]: https://img.shields.io/codecov/c/github/maxa-ondrej/openapi-typescript-codegen.svg
[downloads-url]: http://npm-stat.com/charts.html?package=@majkit/openapi
[downloads-image]: http://img.shields.io/npm/dm/@majkit/openapi.svg
[build-url]: https://dl.circleci.com/status-badge/redirect/circleci/Y53CrcVgMSBZm7DzvzFD9k/AgUdrXXFjtCoKjN45w9nRx/tree/master
[build-image]: https://dl.circleci.com/status-badge/img/circleci/Y53CrcVgMSBZm7DzvzFD9k/AgUdrXXFjtCoKjN45w9nRx/tree/master.svg?style=svg
