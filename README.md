# @moccona/apicodegen

`@moccona/apicodegen` is a command-line tool for generating TypeScript code from OpenAPI documentation. It provides a simple and efficient way to automate the process of creating API clients.

## Installation

To install `@moccona/apicodegen`, you can use npm or yarn:

```sh
npm install -g @moccona/apicodegen

or

```sh
yarn global add @moccona/apicodegen
```

## Usage

### Basic Command

The basic command to generate TypeScript code from an OpenAPI documentation URL is as follows:

```sh
apicodegen <docURL> --output ./output.ts
```

- `<docURL>`: The URL of the OpenAPI documentation file.
- `--output`: The path where the generated TypeScript code will be saved. Default is `./output.ts`.
- `--adaptor`: The adaptor for API calls. Default is `fetch`.
- `--baseURL`: The base path of the API endpoint.
- `--verbose`: Enable verbose logging.
- `--importClientSource`: The source from which the request tool will be imported.

## Example

To generate TypeScript code from an OpenAPI documentation file located at `https://api.example.com/openapi.json` and save it to `./src/api.ts`, you can run:

```sh
apicodegen https://api.example.com/openapi.json --output ./src/api.ts
```

## Contributing

Contributions are welcome! Please read the [contributing guidelines](./CONTRIBUTING.md) before submitting a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
