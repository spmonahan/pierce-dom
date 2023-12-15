# PierceDom

APIs for piercing the shadow DOM.

## Development

```sh
# Install dependencies
yarn
```

```sh
# Install playwright
npx playwright install
```

This monorepo is managed by [Nx](https://nx.dev). Run commands for sub-packages via Nx.

For example, to build the `treewalker` package:

```sh
yarn nx run treewalker:build
```

For other packages substitute "treewalker" with the other package name.

**Package list**

- `treewalker`
- `element-contains`

### Running tests

Tests are run via Playwright and require a running server to serve the test pages.

To run tests you'll need three CLI tabs. Using `treewalker` as an example:

**First tab**

```sh
# Build the library in the first tab, rebuild for changes
yarn nx run treewalker:build
```

**Second tab**

```sh
# Start up the test server in the second tab
yarn nx run treewalker:test:server
```

**Third tab**

```sh
# Run the tests with the Playwright UI (useful for development and debugging)
yarn nx run treewalker:test:ui
```

OR

```sh
# Run the tests without UI
yarn nx run treewalker:test
```