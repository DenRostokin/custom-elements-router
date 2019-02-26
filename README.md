## Router for custom elements

The router is very similar to react-router.

## Contents

- [How To Install](#how-to-install)
- [Usage](#usage)
- [Features](#features)

### How to install

First of all you need to install `custom-elements-jsx` module and configure it. **[Here is the library](https://github.com/DenRostokin/custom-elements-jsx)**. You must configure babel like it is described in the README.md of the `custom-elements-jsx`.

Then you can install `custom-elements-router`:

```sh
$ npm install --save custom-elements-router
```

or

```sh
$ yarn add custom-elements-router
```

### Usage

You need to import `custom-elements-router` once to get access to all custom elements from the library. For example, you can import it in your root index.js file:

```jsx
import jsx from "custom-elements-jsx";
import "custom-elements-router";
import history from "history";

const browserHistory = history.createBrowserHistory();

const app = (
  <custom-router history={browserHistory}>
    <custom-switch>
      <custom-route path="/" component="main-page" />
    </custom-switch>
  </custom-router>
);

const root = document.getElementById("root");

root.appendChild(app);
```

Or you can wrap your custom element by the `custom-router`:

```jsx
import jsx from "custom-elements-jsx";
import "custom-elements-router";
import history from "history";

import "./app.js";

const browserHistory = history.createBrowserHistory();

const app = (
  <custom-router history={browserHistory}>
    <app-page />
  </custom-router>
);

const root = document.getElementById("root");

root.appendChild(app);
```

Inside of `<app-page />` you will get `context` object that you must pass to other custom elements from `custom-elements-router`:

```jsx
import jsx, { Component } from "custom-elements-jsx";

class AppPage extends Component {
  render() {
    const { context } = this.props;

    return (
      <custom-switch context={context}>
        <custom-route path="/" component="main-page" />
        <custom-route path="/users" exact component="users-page" />
      </custom-switch>
    );
  }
}

if (!window.customElements.get("app-page"))
  window.customElements.define("app-page", AppPage);
```

`<custom-switch>` chooses one of his children with correct `path` property. Other children will not be rendered.

If you use `custom-route` outside of `custom-switch` then all routes will be rendered, but only one `custom-route` will have children. Other routes will be empty.

`<custom-route>` receives the same props as `<Route>` from `react-router` library: `path`, `exact`, `component`, `render`. Also it receives `context` prop. You should remember about this if you user `<coustom-route>` outside of `<custom-switch>` or `<custom-router>`.

In the `path` property you should specify full path. Also you can specify variable, for example `userId`:

```jsx
<custom-route path="/users/:userId" component="user-page" />
```

Then you will get `userId` from `context` object inside of `<user-page>`:

```jsx
import jsx, { Component } from "custom-elements-jsx";

class UserPage extends Component {
  render() {
    const { context } = this.props;
    const { userId } = context.match.params;

    return null;
  }
}
```

The `context` object has following props: `history`, `match`, `location`, `staticContext`. The same props as in `react-router` library.

You can find `pathname` from `this.props.context.location.pathname`.

If you specify the `exact` property then exact match will be found for this route. Otherwise entry will be found. It can be usefull if you want to use `<custom-route>` inside of your custom element.

```jsx
import jsx, { Component } from 'custom-elements-jsx'

// root index.js
cosnt app = (
    <custom-router history={browserHistory}>
        <custom-route path="/" component="home-page" />
    </custom-router>
)

// homePage.js
class HomePage extends Component {
    render() {
        const { context } = this.props

        return (
            <custom-switch context={context}>
                <custom-route path="/users" exact component="users-page" />
                <custom-route path="/settings" exact component="settings-page" />
            </custom-switch>
        )
    }
}
```

In the `component` property you should specify name of your custom element. You should define this element before using in the `component`. Type of `component` property is string.

Also you can specify `render` property. This is a function that receives props as first argument. This function must return HTMLElement:

```jsx
import jsx, { Component } from "custom-elements-jsx";

const app = (
  <custom-router history={browserHistory}>
    <custom-route
      path="/"
      name="John"
      render={props => <div>{props.name}</div>}
    />
  </custom-router>
);
```

You will get:

```html
<custom-router>
  <custom-route>
    <div>John</div>
  </custom-route>
</custom-router>
```

If you specify both props `component` and `render` then `render` will be used.

You have 2 links in the `<custom-elements-router`: `<custom-link>` and `<custom-nav-link>`. You must pass the `context` object to both of it. This links receive the same props as links in `react-router` library.

### Features

There is an another way to use `<custom-router>` without `<custom-switch>` and `<custom-route>`. You can pass to the `<custom-router>` array of routes as a property `routes`.

```jsx
// root index.js
import jsx, { Component } from "custom-elements-jsx";
import "custom-elements-router";
import history from "history";

const browserHistory = history.createBrowserHistory();

const routes = [
  {
    path: "/",
    component: "root-page",
    routes: [
      {
        path: "/users",
        component: "users-page",
        exact: true
      },
      {
        path: "/settings",
        component: "settings-page",
        exact: true
      }
    ]
  }
];

const app = <custom-router history={browserHistory} routes={routes} />;
const root = document.getElementById("root");

root.appendChild(app);
```

Each component (`root-page`, `users-page`, etc) will get 2 props: `context` and `route`. `route` is an object from `routes` array. For example, component `root-page` will get following object as `route` property:

```js
{
  path: "/",
  component: "root-page",
  routes: [
    {
      path: "/users",
      component: "users-page",
      exact: true
    },
    {
      path: "/settings",
      component: "settings-page",
      exact: true
    }
  ]
}
```

But `users-page` will get:

```js
{
  path: "/users",
  component: "users-page",
  exact: true
}
```

You can render nested routes inside of `root-page` using function `renderRoutes()`:

```jsx
import jsx, { Component } from "custom-elements-jsx";
import { renderRoutes } from "custom-elements-router";

class RootPage extends Component {
  render() {
    const { route, context } = this.props;
    return <div>{renderRoutes(route.routes, context)}</div>;
  }
}

if (!window.customElements.get("root-page"))
  window.customElements.define("root-page", RootPage);
```

You must pass the `context` object to the `renderRoutes()` function.

Also you have `matchRoutes()` function. This is the save function like in the `react-router` library.

If you don't want to pass history to the `<custom-router>` element you can use `<custom-browser-router>`. Browser history will be created inside of this element.

Also you have `<custom-hash-router>` and `<custom-memory-router>`. They are the same like in `react-router` library. All of it receive the same props as `<custom-router>` element.
