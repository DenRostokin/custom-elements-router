import jsx, { Component } from 'custom-elements-jsx'
import { renderRoutes } from '../src/index'

import createHistory from 'history/createBrowserHistory'

const history = createHistory()

describe('Custom memory router', () => {
    it('throws a warning if history there is in props', () => {
        const element = <custom-memory-router history={history} />

        expect(element.componentDidCreate.bind(element)).not.toThrow()
    })

    it('creates history correctly', () => {
        const element = <custom-memory-router />

        element.componentDidCreate.call(element)

        expect('history' in element).toBeTruthy()
    })

    it('renders children correctly', () => {
        const element = (
            <custom-memory-router>
                <div id="route" />
            </custom-memory-router>
        )

        document.body.appendChild(element)

        const routeElement = document.getElementById('route')

        expect('context' in routeElement.props).toBeTruthy()

        document.body.removeChild(element)
    })

    it('renders routes correctly', () => {
        class MemoryRoute extends Component {
            render() {
                return null
            }
        }

        window.customElements.define('memory-route', MemoryRoute)

        const routes = [
            {
                path: '/',
                component: 'memory-route',
            },
        ]

        const element = <custom-memory-router routes={routes} />

        document.body.appendChild(element)

        const memoryRouteElement = document.getElementsByTagName(
            'memory-route'
        )[0]

        expect('route' in memoryRouteElement.props).toBeTruthy()
        expect('path' in memoryRouteElement.props.route).toBeTruthy()
        expect('component' in memoryRouteElement.props.route).toBeTruthy()

        expect('context' in memoryRouteElement.props).toBeTruthy()
        expect('history' in memoryRouteElement.props.context).toBeTruthy()
        expect('location' in memoryRouteElement.props.context).toBeTruthy()
        expect('match' in memoryRouteElement.props.context).toBeTruthy()
        expect('staticContext' in memoryRouteElement.props.context).toBeTruthy()

        document.body.removeChild(element)
    })

    it('renders nested routes correctly', () => {
        class NestedMemoryRoutes extends Component {
            render() {
                const { route, context } = this.props

                return renderRoutes(route.routes, context)
            }
        }

        class NestedMemoryRoute extends Component {
            render() {
                return null
            }
        }

        window.customElements.define('nested-memory-routes', NestedMemoryRoutes)
        window.customElements.define('nested-memory-route', NestedMemoryRoute)

        const routes = [
            {
                path: '/',
                component: 'nested-memory-routes',
                routes: [
                    {
                        path: '/',
                        component: 'nested-memory-route',
                    },
                ],
            },
        ]

        const element = <custom-memory-router routes={routes} />

        document.body.appendChild(element)

        const nestedMemoryRouteElement = document.getElementsByTagName(
            'nested-memory-route'
        )[0]

        expect('route' in nestedMemoryRouteElement.props).toBeTruthy()
        expect('path' in nestedMemoryRouteElement.props.route).toBeTruthy()
        expect('component' in nestedMemoryRouteElement.props.route).toBeTruthy()

        expect('context' in nestedMemoryRouteElement.props).toBeTruthy()

        document.body.removeChild(element)
    })
})
