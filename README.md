# Rotion

Rotion is an application similar to Notion that was created using Electron with React and TypeScript.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ pnpm install
```

### Development

```bash
$ pnpm dev
```

### Build

```bash
# For windows
$ pnpm build:win

# For macOS
$ pnpm build:mac

# For Linux
$ pnpm build:linux
```
## Create New Release

Create a new release by creating a tag using the semantic version:

```bash
$ git add .
$ git commit -m 'your message commit'
$ git tag v.1.0.0
$ git push --tags
```
