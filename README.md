# diverge

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

# Files structure

- assets
- components - here we include all of the app's generic components
- composables - here we include all of the app's generic composables
- constants - constant data to be used across the app
- directives
- layouts
- locales
- middlewares
- modules - dir to include all the modules separately each module dir should contain
  - components dir
  - store dir
  - view dir
  - router dir
  - tests dir
- plugins
- router - app's routes
- stores - generic stores
- types - types for the app
- utils - utils helper functions
- views - app's generic pages

# Roles And Permissions

The app has three roles included in **constants** dir

```
export const roles = {
  admin: ['create_user', 'edit_user', 'delete_user', 'read_user', 'read_reports', 'manage_roles'],
  editor: ['edit_user', 'read_reports', 'read_user'],
  viewer: ['read_reports'],
}
```

## Toggle roles

To toggle roles you just need to click on the avatar in the nav bar and select another role of the roles

## permissions mechanism

I handled permissions by creating a directive and register it named `v-has-permission` it renders the block conditionally depending on that array.

This Directive uses a function imported from utils named `hasPermisson` it takes in array of permissions and returns true or false and the value is used in the directive.

# Middlewares

To protect authorized routes I created `Middleware` named `permissions` in the middleware dir.

```
export default function permissionsMiddleware(to, from, next) {
  const { currentuser } = storeToRefs(useUsersStore())
  const userPermissions = currentuser.value.permissions

  const requiredPermissions = to.meta.permissions as string[] | undefined
  if (requiredPermissions) {
    const hasPermission = requiredPermissions.some((perm) => userPermissions.includes(perm))

    if (!hasPermission) {
      return next('/not-allowed')
    }
  }

  next()
}
```

This Middleware is used in the `router` navigation guard `beforeEach`
and every authorized route has permissions array in its meta object, depending on that
array we decide whether to enter the route or to redirect the user to not-allowed page
