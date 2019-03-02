import jsx, { Component } from 'custom-elements-jsx'
import createHistory from 'history/createBrowserHistory'

import CustomRouter, { renderRoutes } from '../src/index'

const history = createHistory()

describe('Custom router', () => {
    it('creates root match object correctly', () => {
        const exactMatch = CustomRouter.computeRootMatch('/')
        const notExactMatch = CustomRouter.computeRootMatch('/route')

        expect('path' in exactMatch).toBeTruthy()
        expect('url' in exactMatch).toBeTruthy()
        expect('params' in exactMatch).toBeTruthy()
        expect('isExact' in exactMatch).toBeTruthy()

        expect(exactMatch.path).toBe('/')
        expect(exactMatch.url).toBe('/')
        expect(exactMatch.params instanceof Object).toBeTruthy()
        expect(exactMatch.isExact).toBeTruthy()

        expect(notExactMatch.isExact).toBeFalsy()
    })

    it('throws an error without a history propperty', () => {
        const element = <custom-router />

        expect(element.componentDidCreate.bind(element)).toThrowError(
            'Invariant failed: You should not use <custom-router> without history'
        )
    })

    it('gets location and adds listerner to the history after appending to the DOM', () => {
        const element = (
            <custom-router history={history}>
                <div />
            </custom-router>
        )

        element.componentDidCreate.call(element)

        expect('location' in element).toBeTruthy()
        expect(element.unlisten).toBeDefined()
    })

    it('has unlisten function in the componentWillUnmount method', () => {
        const element = (
            <custom-router history={history}>
                <div />
            </custom-router>
        )

        element.componentDidCreate.call(element)
        element.componentWillUnmount.call(element)

        expect(element.unlisten).toBeDefined()
    })

    it('passes context to his children correctly', () => {
        class PassContext extends Component {
            render() {
                return null
            }
        }

        window.customElements.define('pass-context', PassContext)

        const element = (
            <custom-router history={history}>
                <pass-context id="passContext" />
            </custom-router>
        )

        document.body.appendChild(element)

        const passContextElement = document.getElementById('passContext')

        expect(passContextElement).toBeDefined()
        expect('context' in passContextElement.props).toBeTruthy()
        expect('history' in passContextElement.props.context).toBeTruthy()
        expect('location' in passContextElement.props.context).toBeTruthy()
        expect('match' in passContextElement.props.context).toBeTruthy()
        expect('staticContext' in passContextElement.props.context).toBeTruthy()

        document.body.removeChild(element)
    })

    it('passes context and routes to his children correctly', () => {
        class PassRoute extends Component {
            render() {
                return null
            }
        }

        window.customElements.define('pass-route', PassRoute)

        const routes = [
            {
                path: '/',
                component: 'pass-route',
            },
        ]

        const element = <custom-router history={history} routes={routes} />

        document.body.appendChild(element)

        const passRouteElement = document.getElementsByTagName('pass-route')[0]

        expect(passRouteElement).toBeDefined()
        expect('route' in passRouteElement.props).toBeTruthy()
        expect('path' in passRouteElement.props.route).toBeTruthy()
        expect('component' in passRouteElement.props.route).toBeTruthy()

        expect('context' in passRouteElement.props).toBeTruthy()
        expect('history' in passRouteElement.props.context).toBeTruthy()
        expect('location' in passRouteElement.props.context).toBeTruthy()
        expect('match' in passRouteElement.props.context).toBeTruthy()
        expect('staticContext' in passRouteElement.props.context).toBeTruthy()

        document.body.removeChild(element)
    })

    it('renders nested routes correctly', () => {
        class NestedRoutes extends Component {
            render() {
                const { route, context } = this.props

                return renderRoutes(route.routes, context)
            }
        }

        class NestedRoute extends Component {
            render() {
                return null
            }
        }

        window.customElements.define('nested-routes', NestedRoutes)
        window.customElements.define('nested-route', NestedRoute)

        const routes = [
            {
                path: '/',
                component: 'nested-routes',
                routes: [
                    {
                        path: '/',
                        component: 'nested-route',
                    },
                ],
            },
        ]

        const element = <custom-router history={history} routes={routes} />

        document.body.appendChild(element)

        const nestedRoutesElement = document.getElementsByTagName(
            'nested-routes'
        )[0]
        const nestedRouteElement = document.getElementsByTagName(
            'nested-route'
        )[0]

        expect(nestedRoutesElement).toBeDefined()
        expect(nestedRouteElement).toBeDefined()
        expect('route' in nestedRouteElement.props).toBeTruthy()
        expect('path' in nestedRouteElement.props.route).toBeTruthy()
        expect('component' in nestedRouteElement.props.route).toBeTruthy()
        expect('context' in nestedRouteElement.props).toBeTruthy()

        document.body.removeChild(element)
    })
})
