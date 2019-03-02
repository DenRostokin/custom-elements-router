import jsx, { Component } from 'custom-elements-jsx'
import CustomRouter from '../src/index'

describe('Custom switch', () => {
    it('throws an error without context property', () => {
        const element = <custom-switch />

        expect(element.componentDidCreate.bind(element)).toThrowError(
            'Invariant failed: You should not use <custom-switch> without context'
        )
    })

    it('finds matched children correctly', () => {
        class RootElementForSwitch extends Component {
            render() {
                return null
            }
        }

        class SideElementForSwitch extends Component {
            render() {
                return null
            }
        }

        window.customElements.define(
            'root-element-for-switch',
            RootElementForSwitch
        )
        window.customElements.define(
            'side-element-for-switch',
            SideElementForSwitch
        )

        const match = CustomRouter.computeRootMatch('/')
        const location = { pathname: '/side' }
        const context = { match, location }

        const element = (
            <custom-switch context={context}>
                <root-element-for-switch path="/" />
                <side-element-for-switch path="/side" />
            </custom-switch>
        )

        const matchedElement = element.render.call(element)

        expect(matchedElement).toBeDefined()
        expect('context' in matchedElement.props).toBeTruthy()
        expect(matchedElement.props.context.computedMatch).toEqual({
            path: '/',
            url: '/',
            isExact: false,
            params: {},
        })
    })

    it('finds exact matched children correctly', () => {
        class ExactRootElementForSwitch extends Component {
            render() {
                return null
            }
        }

        class ExactSideElementForSwitch extends Component {
            render() {
                return null
            }
        }

        window.customElements.define(
            'exact-root-element-for-switch',
            ExactRootElementForSwitch
        )
        window.customElements.define(
            'exact-side-element-for-switch',
            ExactSideElementForSwitch
        )

        const match = CustomRouter.computeRootMatch('/')
        const location = { pathname: '/side' }
        const context = { match, location }

        const element = (
            <custom-switch context={context}>
                <exact-side-element-for-switch path="/side" exact />
                <exact-root-element-for-switch path="/" />
            </custom-switch>
        )

        const matchedElement = element.render.call(element)

        expect(matchedElement).toBeDefined()
        expect('context' in matchedElement.props).toBeTruthy()
        expect(matchedElement.props.context.computedMatch).toEqual({
            path: '/side',
            url: '/side',
            isExact: true,
            params: {},
        })
    })

    it('gets pathname with params correctly', () => {
        class RootRouteParams extends Component {
            render() {
                return null
            }
        }

        class SideRouteParams extends Component {
            render() {
                return null
            }
        }

        window.customElements.define('root-route-params', RootRouteParams)
        window.customElements.define('side-route-params', SideRouteParams)

        const match = CustomRouter.computeRootMatch('/')
        const location = { pathname: '/side/value' }
        const context = { location, match }

        const element = (
            <custom-switch context={context}>
                <side-route-params path="/side/:id" exact />
                <root-route-params path="/" />
            </custom-switch>
        )

        const matchedElement = element.render.call(element)

        expect(matchedElement).toBeDefined()
        expect(matchedElement.props.context.computedMatch).toEqual({
            path: '/side/:id',
            url: '/side/value',
            isExact: true,
            params: { id: 'value' },
        })
    })

    it('returns first child without path or from property', () => {
        class ComponentWithoutPath extends Component {
            render() {
                return null
            }
        }

        window.customElements.define(
            'component-without-path',
            ComponentWithoutPath
        )

        const match = CustomRouter.computeRootMatch('/')
        const location = { pathname: '/side/value' }
        const context = { location, match }

        const element = (
            <custom-switch context={context}>
                <component-without-path />
            </custom-switch>
        )

        const matchedElement = element.render.call(element)

        expect(matchedElement).toBeDefined()
        expect(matchedElement.props.context.computedMatch).toEqual(match)
    })

    it('works with element that have "from" property except "path" correctly', () => {
        class RouteWithFromProp extends Component {
            render() {
                return null
            }
        }

        window.customElements.define('route-with-from-prop', RouteWithFromProp)

        const match = CustomRouter.computeRootMatch('/')
        const location = { pathname: '/side' }
        const context = { location, match }

        const element = (
            <custom-switch context={context}>
                <route-with-from-prop from="/side" exact />
            </custom-switch>
        )

        const matchedElement = element.render.call(element)

        expect(matchedElement).toBeDefined()
        expect('context' in matchedElement.props).toBeTruthy()
        expect(matchedElement.props.context.computedMatch).toEqual({
            path: '/side',
            url: '/side',
            isExact: true,
            params: {},
        })
    })

    it('does not render children if no one path is equal', () => {
        class NotRootComponent extends Component {
            render() {
                return null
            }
        }

        class NotSideComponent extends Component {
            render() {
                return null
            }
        }

        window.customElements.define('not-root-component', NotRootComponent)
        window.customElements.define('not-side-component', NotSideComponent)

        const match = CustomRouter.computeRootMatch('/')
        const location = { pathname: '/' }
        const context = { location, match }

        const element = (
            <custom-switch context={context}>
                <not-root-component path="/notroot" exact />
                <not-side-component path="/notside" exact />
            </custom-switch>
        )

        const matchedElement = element.render.call(element)

        expect(matchedElement).toBeNull()
    })

    it('gets context from custom router and renders children correctly', () => {
        class SimpleCustomRouteForCheckingContext extends Component {
            render() {
                return null
            }
        }

        window.customElements.define(
            'simple-custom-route-for-checking-context',
            SimpleCustomRouteForCheckingContext
        )

        const element = (
            <custom-browser-router>
                <custom-switch id="customSwitch">
                    <simply-custom-route-for-checking-context
                        id="routeForContext"
                        path="/"
                    />
                </custom-switch>
            </custom-browser-router>
        )

        document.body.appendChild(element)

        const switchElement = document.getElementById('customSwitch')
        const routeElement = document.getElementById('routeForContext')

        expect(switchElement).toBeDefined()
        expect('context' in switchElement.props).toBeTruthy()
        expect(routeElement).toBeDefined()
        expect('context' in routeElement.props).toBeTruthy()

        document.body.removeChild(element)
    })
})
