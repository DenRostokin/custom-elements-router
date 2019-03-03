import jsx, { Component } from 'custom-elements-jsx'

import CustomRouter from '../src/index'

describe('Custom route', () => {
    it('throws an error without context property', () => {
        const element = <custom-route />

        expect(element.componentDidCreate.bind(element)).toThrowError(
            'Invariant failed: You should not use <custom-route> without context'
        )
    })

    it('renders functional children correctly', () => {
        class RouteFunctionalChild extends Component {
            render() {
                return null
            }
        }

        window.customElements.define(
            'route-functional-child',
            RouteFunctionalChild
        )

        const match = CustomRouter.computeRootMatch('/')
        const location = { pathname: '/' }
        const context = { match, location }

        const element = (
            <custom-route path="/" context={context}>
                {props => <route-functional-child {...props} />}
            </custom-route>
        )

        const matchedElement = element.render.call(element)

        expect(matchedElement).not.toBeNull()

        document.body.appendChild(matchedElement)

        const childElement = document.getElementsByTagName(
            'ROUTE-FUNCTIONAL-CHILD'
        )[0]

        expect(childElement).toBeDefined()
        expect('context' in childElement.props).toBeTruthy()
        expect(childElement.props.context.match).not.toBeNull()

        document.body.innerHTML = ''
    })

    it('renders children without path checking correctly', () => {
        class CustomRouteChild extends Component {
            render() {
                return null
            }
        }

        window.customElements.define('custom-route-child', CustomRouteChild)

        const match = CustomRouter.computeRootMatch('/')
        const location = { pathname: '/side' }
        const context = { match, location }

        const element = (
            <custom-route path="/" exact context={context}>
                <custom-route-child />
            </custom-route>
        )

        const matchedElement = element.render.call(element)

        expect(matchedElement).not.toBeNull()

        document.body.appendChild(matchedElement)

        const matchedChild = document.getElementsByTagName(
            'CUSTOM-ROUTE-CHILD'
        )[0]

        expect(matchedChild).toBeDefined()
        expect('context' in matchedChild.props).toBeTruthy()
        expect(matchedChild.props.context.match).toBeNull()

        document.body.innerHTML = ''
    })

    it('renders matched route correctly', () => {
        class RouteMatchComponent extends Component {
            render() {
                return null
            }
        }

        window.customElements.define(
            'route-match-component',
            RouteMatchComponent
        )

        const match = CustomRouter.computeRootMatch('/')
        const location = { pathname: '/route' }
        const context = { match, location }

        const element = (
            <custom-route
                context={context}
                path="/route"
                exact
                component="route-match-component"
            />
        )

        const matchedElement = element.render.call(element)

        expect(matchedElement).not.toBeNull()
        expect('context' in matchedElement.props).toBeTruthy()
        expect(matchedElement.props.context.match).toEqual({
            path: '/route',
            url: '/route',
            isExact: true,
            params: {},
        })
    })

    it('executes render function correctly', () => {
        class RouteRenderComponent extends Component {
            render() {
                return null
            }
        }

        window.customElements.define(
            'route-render-component',
            RouteRenderComponent
        )

        const match = CustomRouter.computeRootMatch('/')
        const location = { pathname: '/route' }
        const context = { match, location }

        const element = (
            <custom-route
                context={context}
                path="/route"
                exact
                render={props => <route-render-component {...props} />}
            />
        )

        const matchedElement = element.render.call(element)

        expect(matchedElement).not.toBeNull()
        expect('context' in matchedElement.props).toBeTruthy()
        expect(matchedElement.props.context.match).toEqual({
            path: '/route',
            url: '/route',
            isExact: true,
            params: {},
        })
    })

    it('returns null without matching', () => {
        const match = CustomRouter.computeRootMatch('/')
        const location = { pathname: '/route' }
        const context = { match, location }

        const element = (
            <custom-route
                context={context}
                path="/side"
                exact
                render={() => <div />}
            />
        )

        const matchedElement = element.render.call(element)

        expect(matchedElement).toBeNull()
    })

    it('returns null without component and render props', () => {
        const match = CustomRouter.computeRootMatch('/')
        const location = { pathname: '/route' }
        const context = { match, location }

        const element = <custom-route context={context} path="/route" exact />

        const matchedElement = element.render.call(element)

        expect(matchedElement).toBeNull()
    })

    it('returns contextMatch without path property', () => {
        class WithoutPathRoute extends Component {
            render() {
                return null
            }
        }

        window.customElements.define('without-path-route', WithoutPathRoute)

        const match = CustomRouter.computeRootMatch('/')
        const location = { pathname: '/route' }
        const context = { match, location }

        const element = (
            <custom-route
                context={context}
                exact
                component="without-path-route"
            />
        )

        const matchedElement = element.render.call(element)

        expect(matchedElement).not.toBeNull()
        expect('context' in matchedElement.props).toBeTruthy()
        expect(matchedElement.props.context.match).toEqual(match)
    })

    it('returns computedMatch if this is in the context property', () => {
        class WithComputedMatchRoute extends Component {
            render() {
                return null
            }
        }

        window.customElements.define(
            'with-computed-match-route',
            WithComputedMatchRoute
        )

        const computedMatch = CustomRouter.computeRootMatch('/')
        const location = { pathname: '/route' }
        const context = { computedMatch, location }

        const element = (
            <custom-route
                context={context}
                path="/route"
                exact
                component="with-computed-match-route"
            />
        )

        const matchedElement = element.render.call(element)

        expect(matchedElement).not.toBeNull()
        expect('context' in matchedElement.props).toBeTruthy()
        expect(matchedElement.props.context.match).toEqual(computedMatch)
    })
})
