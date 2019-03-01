import jsx, { Component } from 'custom-elements-jsx'
import { renderRoutes } from '../src/index'

import createHistory from 'history/createBrowserHistory'

const history = createHistory()

describe('Custom browser router', () => {
    it('throws a warning if history there is in props', () => {
        const element = <custom-browser-router history={history} />

        expect(element.componentDidCreate.bind(element)).not.toThrow()
    })

    it('creates history correctly', () => {
        const element = <custom-browser-router />

        element.componentDidCreate.call(element)

        expect('history' in element).toBeTruthy()
    })

    it('renders children correctly', () => {
        const element = (
            <custom-browser-router>
                <div id="route" />
            </custom-browser-router>
        )

        document.body.appendChild(element)

        const routeElement = document.getElementById('route')

        expect('context' in routeElement.props).toBeTruthy()

        document.body.removeChild(element)
    })

    it('renders routes correctly', () => {
        class BrowserRoute extends Component {
            render() {
                return null
            }
        }

        window.customElements.define('browser-route', BrowserRoute)

        const routes = [
            {
                path: '/',
                component: 'browser-route',
            },
        ]

        const element = <custom-browser-router routes={routes} />

        document.body.appendChild(element)

        const browserRouteElement = document.getElementsByTagName(
            'browser-route'
        )[0]

        expect('route' in browserRouteElement.props).toBeTruthy()
        expect('path' in browserRouteElement.props.route).toBeTruthy()
        expect('component' in browserRouteElement.props.route).toBeTruthy()

        expect('context' in browserRouteElement.props).toBeTruthy()
        expect('history' in browserRouteElement.props.context).toBeTruthy()
        expect('location' in browserRouteElement.props.context).toBeTruthy()
        expect('match' in browserRouteElement.props.context).toBeTruthy()
        expect(
            'staticContext' in browserRouteElement.props.context
        ).toBeTruthy()

        document.body.removeChild(element)
    })

    it('renders nested routes correctly', () => {
        class NestedBrowserRoutes extends Component {
            render() {
                const { route, context } = this.props

                return renderRoutes(route.routes, context)
            }
        }

        class NestedBrowserRoute extends Component {
            render() {
                return null
            }
        }

        window.customElements.define(
            'nested-browser-routes',
            NestedBrowserRoutes
        )
        window.customElements.define('nested-browser-route', NestedBrowserRoute)

        const routes = [
            {
                path: '/',
                component: 'nested-browser-routes',
                routes: [
                    {
                        path: '/',
                        component: 'nested-browser-route',
                    },
                ],
            },
        ]

        const element = <custom-browser-router routes={routes} />

        document.body.appendChild(element)

        const nestedBrowserRouteElement = document.getElementsByTagName(
            'nested-browser-route'
        )[0]

        expect('route' in nestedBrowserRouteElement.props).toBeTruthy()
        expect('path' in nestedBrowserRouteElement.props.route).toBeTruthy()
        expect(
            'component' in nestedBrowserRouteElement.props.route
        ).toBeTruthy()

        expect('context' in nestedBrowserRouteElement.props).toBeTruthy()

        document.body.removeChild(element)
    })
})
