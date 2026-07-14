# get-npm-i

A tiny CLI that reads a package.json file and prints the npm commands needed to install its production and development dependencies.

## Usage

Read package.json from the current directory:

    npx get-npm-i@latest

Read a package manifest at another path:

    npx get-npm-i@latest ./path/to/package.json

The CLI prints separate npm i and npm i -D commands and handles missing or invalid JSON files with clear errors.

## Development

    npm install
    npm run build
    npm start -- ./package.json

## Scope

The tool reconstructs dependency-install commands from dependency names. It does not preserve package versions, workspace configuration, overrides, or non-npm package-manager settings.
