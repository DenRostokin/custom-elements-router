import jsx from 'custom-elements-jsx'
import '../src/index'

describe('Custom redirect', () => {
    it('throws an error without context property', () => {
        const element = <custom-redirect />

        expect(element.componentDidCreate.bind(element)).toThrowError(
            'Invariant failed: You should not use <custom-redirect> without context'
        )
    })

    it('replaces location correctly', () => {
        let route = null
        const history = {
            replace: to => (route = to),
        }
        const context = { history }

        const element = <custom-redirect context={context} to="/route" />

        element.componentDidCreate.call(element)

        expect(route).toEqual({
            pathname: '/route',
            search: '',
            hash: '',
            state: undefined,
        })
    })

    it('pushes location correctly', () => {
        let route = null
        const history = {
            push: to => (route = to),
        }
        const context = { history }

        const element = <custom-redirect context={context} to="/route" push />

        element.componentDidCreate.call(element)

        expect(route).toEqual({
            pathname: '/route',
            search: '',
            hash: '',
            state: undefined,
        })
    })

    it('gets props from "route" property correctly', () => {
        let path
        const history = {
            push: to => (path = to),
        }
        const context = { history }
        const route = {
            to: '/route',
            push: true,
        }

        const element = <custom-redirect route={route} context={context} />

        element.componentDidCreate.call(element)

        expect(path.pathname).toBe('/route')
    })

    it('works with custom router and custom switch correctly', () => {
        let route = null
        const history = {
            push: to => (route = to),
            replace: to => (route = to),
            location: { pathname: '/' },
            listen: () => {},
        }
        const element = (
            <custom-router history={history}>
                <custom-switch>
                    <custom-redirect from="/" to="/route" />
                </custom-switch>
            </custom-router>
        )

        document.body.appendChild(element)

        expect(route.pathname).toBe('/route')

        document.body.removeChild(element)
    })

    it('works with custom router and routes array correctly', () => {
        let route = null
        const history = {
            push: to => (route = to),
            replace: to => (route = to),
            location: { pathname: '/' },
            listen: () => {},
        }
        const routes = [
            {
                from: '/',
                component: 'custom-redirect',
                to: '/route',
            },
        ]

        const element = <custom-router history={history} routes={routes} />

        document.body.appendChild(element)

        expect(route.pathname).toBe('/route')

        document.body.removeChild(element)
    })
})
