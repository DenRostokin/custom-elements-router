import jsx, { Component } from 'custom-elements-jsx'
import { renderRoutes } from '../src/index'

import createHistory from 'history/createBrowserHistory'

const history = createHistory()

describe('Custom hash router', () => {
    it('throws a warning if history there is in props', () => {
        const element = <custom-hash-router history={history} />

        expect(element.componentDidCreate.bind(element)).not.toThrow()
    })

    it('creates history correctly', () => {
        const element = <custom-hash-router />

        element.componentDidCreate.call(element)

        expect('history' in element).toBeTruthy()
    })

    it('renders children correctly', () => {
        class HashChildRoute extends Component {
            render() {
                return null
            }
        }

        window.customElements.define('hash-child-route', HashChildRoute)

        const element = (
            <custom-hash-router>
                <hash-child-route id="route" catch="id" />
            </custom-hash-router>
        )

        document.body.appendChild(element)

        const routeElement = document.getElementById('route')

        expect('context' in routeElement.props).toBeTruthy()

        document.body.removeChild(element)
    })

    it('renders routes correctly', () => {
        class HashRoute extends Component {
            render() {
                return null
            }
        }

        window.customElements.define('hash-route', HashRoute)

        const routes = [
            {
                path: '/',
                component: 'hash-route',
            },
        ]

        const element = <custom-hash-router routes={routes} />

        document.body.appendChild(element)

        const hashRouteElement = document.getElementsByTagName('hash-route')[0]

        expect('route' in hashRouteElement.props).toBeTruthy()
        expect('path' in hashRouteElement.props.route).toBeTruthy()
        expect('component' in hashRouteElement.props.route).toBeTruthy()

        expect('context' in hashRouteElement.props).toBeTruthy()
        expect('history' in hashRouteElement.props.context).toBeTruthy()
        expect('location' in hashRouteElement.props.context).toBeTruthy()
        expect('match' in hashRouteElement.props.context).toBeTruthy()
        expect('staticContext' in hashRouteElement.props.context).toBeTruthy()

        document.body.removeChild(element)
    })

    it('renders nested routes correctly', () => {
        class NestedHashRoutes extends Component {
            render() {
                const { route, context } = this.props

                return renderRoutes(route.routes, context)
            }
        }

        class NestedHashRoute extends Component {
            render() {
                return null
            }
        }

        window.customElements.define('nested-hash-routes', NestedHashRoutes)
        window.customElements.define('nested-hash-route', NestedHashRoute)

        const routes = [
            {
                path: '/',
                component: 'nested-hash-routes',
                routes: [
                    {
                        path: '/',
                        component: 'nested-hash-route',
                    },
                ],
            },
        ]

        const element = <custom-hash-router routes={routes} />

        document.body.appendChild(element)

        const nestedHashRouteElement = document.getElementsByTagName(
            'nested-hash-route'
        )[0]

        expect('route' in nestedHashRouteElement.props).toBeTruthy()
        expect('path' in nestedHashRouteElement.props.route).toBeTruthy()
        expect('component' in nestedHashRouteElement.props.route).toBeTruthy()

        expect('context' in nestedHashRouteElement.props).toBeTruthy()

        document.body.removeChild(element)
    })
})
