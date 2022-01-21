# Container Registry Proxy - Custom Plugin Example

[![License](https://img.shields.io/github/license/Addono/container-registry-proxy-custom-plugin-example?style=flat-square)](https://github.com/Addono/container-registry-proxy/blob/master/LICENSE)
[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://img.shields.io/badge/project%20status-Active-greengrass?style=flat-square)](https://www.repostatus.org/#active)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/addono/container-registry-proxy-custom-plugin-example/Test?style=flat-square)<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Contributors](#contributors)

## 🧐 About <a name = "about"></a>

The Container Registry Proxy (CRP) is a small proxy for communicating with a container registry. This proxy can monitor and modify traffic in-transit, as to facilitate additional logging and chaos engineering.

Monitoring and modifying the traffic is delegated to a plugin system. This allows the proxy to be generally reusable and allow anyone to tune it to their needs without having to dive into the source code of the proxy.

This repository is here to give you an example and starting point for creating custom plugins for the CRP. Custom plugins are plugins which are loaded from the file system by the CRP at runtime.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [usage](#usage) for notes on how to use the plugin in production.

### Prerequisites

You need to have [Yarn](https://yarnpkg.com/en/docs/install) installed to use this repository.

### Installing

First we need to install all dependencies, run:

```bash
yarn install
```

### Running Locally

The following command will continuously compile the code of the plugin to plain JavaScript.

```bash
yarn build --watch
```

### Editing

To modify the plugin, open `./plugin.ts` and modify the plugin by adding your logic to the `requestPipe` method of the by default exported object.

The `requestPipe` is function, which takes a `Request` object as it's only argument. Its return type is a promise of a (if desired modified) `Request` object, or otherwise `undefined` if the connection should be dropped.

```typescript
type Request = {
  host: string
  https: boolean
  version: string
  parameters?: {
    repository: string
    method: Method
    tag: string
  }
}

interface Plugin {
  name: string
  description?: string
  requestPipe: RequestPipe
}
```
Up to date type definitions can be inferred by your IDE or found [here](https://github.com/Addono/container-registry-proxy/blob/master/src/plugins.ts).

## 🎈 Usage <a name="usage"></a>

First, build the plugin:
```bash
yarn build
```

Then you can attach it to the `container-regsitry-proxy` by running:
```bash
container-registry-proxy --customPlugin dist/plugin.js
```

## ✨ Contributors <a name = "contributors"></a>

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://aknapen.nl"><img src="https://avatars1.githubusercontent.com/u/15435678?v=4" width="100px;" alt=""/><br /><sub><b>Adriaan Knapen</b></sub></a><br /><a href="https://github.com/Addono/container-registry-proxy/commits?author=Addono" title="Code">💻</a> <a href="https://github.com/Addono/container-registry-proxy/commits?author=Addono" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
