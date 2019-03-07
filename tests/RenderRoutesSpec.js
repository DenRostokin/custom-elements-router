import jsx, { Component } from 'custom-elements-jsx'

import renderRoutes from '../src/renderRoutes'

describe('renderRoutes function', () => {
    it('throws an error without a context propperty', () => {
        expect(renderRoutes).toThrowError(
            'Invariant failed: You should not use renderRoutes without context'
        )
    })

    it('returns null without routes and with empty context', () => {
        expect(renderRoutes(undefined, {})).toBeNull()
    })

    it('renders routes correctly', () => {
        class MatchRenderRoute extends Component {
            render() {
                return null
            }
        }

        window.customElements.define('match-render-route', MatchRenderRoute)

        const context = {
            location: { pathname: '/route' },
        }
        const routes = [
            {
                path: '/route',
                component: 'match-render-route',
            },
        ]

        const element = renderRoutes(routes, context)

        expect(element).not.toBeNull()
        expect(element instanceof HTMLElement).toBeTruthy()
        expect('context' in element.props).toBeTruthy()
        expect('route' in element.props).toBeTruthy()
        expect(element.props.context.match).toEqual({
            path: '/route',
            url: '/route',
            isExact: true,
            params: {},
        })

        expect(element.props.route).toEqual({
            path: '/route',
            component: 'match-render-route',
        })
    })

    it('renders routes with from property correctly', () => {
        class MatchFromRoute extends Component {
            render() {
                return null
            }
        }

        window.customElements.define('match-from-route', MatchFromRoute)

        const context = {
            location: { pathname: '/route' },
        }
        const routes = [
            {
                from: '/route',
                component: 'match-from-route',
            },
        ]

        const element = renderRoutes(routes, context)

        expect(element).not.toBeNull()
        expect(element instanceof HTMLElement).toBeTruthy()
        expect('context' in element.props).toBeTruthy()
        expect('route' in element.props).toBeTruthy()
        expect(element.props.context.match).toEqual({
            path: '/route',
            url: '/route',
            isExact: true,
            params: {},
        })

        expect(element.props.route).toEqual({
            from: '/route',
            component: 'match-from-route',
        })
    })

    it('renders rest routes correctly', () => {
        class MatchMainRoute extends Component {
            render() {
                return null
            }
        }
        class MatchRestRoute extends Component {
            render() {
                return null
            }
        }

        window.customElements.define('match-main-route', MatchMainRoute)
        window.customElements.define('match-rest-route', MatchRestRoute)

        const context = { location: { pathname: '/restroute' } }
        const routes = [
            {
                path: '/main',
                component: 'match-main-route',
                exact: true,
            },
            {
                path: '/',
                component: 'match-rest-route',
            },
        ]

        const element = renderRoutes(routes, context)

        expect(element).not.toBeNull()
        expect('context' in element.props).toBeTruthy()
        expect('route' in element.props).toBeTruthy()
        expect(element.props.context.match).toEqual({
            path: '/',
            url: '/',
            isExact: false,
            params: {},
        })

        expect(element.props.route).toEqual({
            path: '/',
            component: 'match-rest-route',
        })
    })

    it('renders nested routes correctly', () => {
        class MatchRootRoute extends Component {
            render() {
                const { route, context } = this.props

                return renderRoutes(route.routes, context)
            }
        }
        class MatchNestedRoute extends Component {
            render() {
                return null
            }
        }

        window.customElements.define('match-root-route', MatchRootRoute)
        window.customElements.define('match-nested-route', MatchNestedRoute)

        const context = { location: { pathname: '/route' } }
        const routes = [
            {
                path: '/',
                component: 'match-root-route',
                routes: [
                    {
                        path: '/route',
                        component: 'match-nested-route',
                        exact: true,
                    },
                ],
            },
        ]

        const rootElement = renderRoutes(routes, context)

        document.body.appendChild(rootElement)

        expect(rootElement.children.length).toBeGreaterThan(0)

        const element = rootElement.children[0]

        expect('context' in element.props).toBeTruthy()
        expect('route' in element.props).toBeTruthy()
        expect(element.props.context.match).toEqual({
            path: '/route',
            url: '/route',
            isExact: true,
            params: {},
        })

        expect(element.props.route).toEqual({
            path: '/route',
            component: 'match-nested-route',
            exact: true,
        })

        document.body.removeChild(rootElement)
    })

    it('renders route using "render" property correctly', () => {
        class MatchRouteWithRender extends Component {
            render() {
                return null
            }
        }

        window.customElements.define(
            'match-route-wiht-render',
            MatchRouteWithRender
        )

        const context = { location: { pathname: '/' } }
        const routes = [
            {
                path: '/',
                render: props => <match-route-with-render {...props} />,
            },
        ]

        const element = renderRoutes(routes, context)

        expect(element).not.toBeNull()
        expect(element instanceof HTMLElement).toBeTruthy()
        expect('context' in element.props).toBeTruthy()
        expect('route' in element.props).toBeTruthy()
        expect(element.props.context.match).toEqual({
            path: '/',
            url: '/',
            isExact: true,
            params: {},
        })

        expect(element.props.route).toEqual(routes[0])
    })

    it('renders route without "path" or "from" property usin context.match correctly', () => {
        class MatchFromContextRoute extends Component {
            render() {
                return null
            }
        }

        window.customElements.define(
            'match-from-context-route',
            MatchFromContextRoute
        )

        const context = {
            location: { pathname: '/' },
            match: {
                path: '/',
                url: '/',
                isExact: true,
                params: {},
            },
        }
        const routes = [
            {
                component: 'match-from-context-route',
            },
        ]

        const element = renderRoutes(routes, context)

        expect(element).not.toBeNull()
        expect(element instanceof HTMLElement).toBeTruthy()
        expect('context' in element.props).toBeTruthy()
        expect('route' in element.props).toBeTruthy()
        expect(element.props.context.match).toEqual(context.match)

        expect(element.props.route).toEqual({
            component: 'match-from-context-route',
        })
    })
})
