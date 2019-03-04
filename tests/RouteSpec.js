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

    it('works with location from props except location from context correctly', () => {
        class PropLocatioRoute extends Component {
            render() {
                return null
            }
        }

        window.customElements.define('prop-location-route', PropLocatioRoute)

        const match = CustomRouter.computeRootMatch('/')
        const context = { match, location: { pathname: '/side' } }
        const propsLocation = { pathname: '/route' }

        const element = (
            <custom-route
                context={context}
                location={propsLocation}
                path="/route"
                exact
                component="prop-location-route"
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

    it('works with from property except path correctly', () => {
        class PropFromRoute extends Component {
            render() {
                return null
            }
        }

        window.customElements.define('prop-from-route', PropFromRoute)

        const match = CustomRouter.computeRootMatch('/')
        const location = { pathname: '/route' }
        const context = { match, location }

        const element = (
            <custom-route
                context={context}
                from="/route"
                exact
                component="prop-from-route"
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

    it('works with custom router and custom switch correctly', () => {
        class RootCustomRoute extends Component {
            render() {
                return null
            }
        }

        class SideCustomRoute extends Component {
            render() {
                return null
            }
        }

        window.customElements.define('root-custom-route', RootCustomRoute)
        window.customElements.define('side-custom-route', SideCustomRoute)

        const element = (
            <custom-browser-router>
                <custom-switch>
                    <custom-route
                        id="sideCustomRoute"
                        path="/side"
                        exact
                        component="side-custom-route"
                    />
                    <custom-route
                        id="rootCustomRoute"
                        path="/"
                        component="root-custom-route"
                    />
                </custom-switch>
            </custom-browser-router>
        )

        document.body.appendChild(element)

        const rootRoute = document.getElementById('rootCustomRoute')
        const sideRoute = document.getElementById('sideCustomRoute')

        expect(sideRoute).toBeNull()
        expect(rootRoute).not.toBeNull()

        document.body.removeChild(element)
    })

    it('works with custom router without custom switch correctly', () => {
        class WithoutSwitchRootRoute extends Component {
            render() {
                return null
            }
        }

        class WithoutSwitchSideRoute extends Component {
            render() {
                return null
            }
        }

        window.customElements.define(
            'without-switch-root-route',
            WithoutSwitchRootRoute
        )
        window.customElements.define(
            'without-switch-side-route',
            WithoutSwitchSideRoute
        )

        const element = (
            <custom-browser-router>
                <custom-route
                    id="withoutSwitchSide"
                    path="/side"
                    exact
                    component="without-switch-side-route"
                />
                <custom-route
                    id="withoutSwitchRoot"
                    path="/"
                    component="without-switch-root-route"
                />
            </custom-browser-router>
        )

        document.body.appendChild(element)

        const rootRoute = document.getElementById('withoutSwitchRoot')
        const sideRoute = document.getElementById('withoutSwitchSide')

        expect(rootRoute).not.toBeNull()
        expect(sideRoute).not.toBeNull()
        expect(rootRoute.children.length).toBe(1)
        expect(sideRoute.children.length).toBe(0)
        expect(rootRoute.children[0].tagName).toBe('WITHOUT-SWITCH-ROOT-ROUTE')

        document.body.removeChild(element)
    })
})
