import jsx from 'custom-elements-jsx'
import { createBrowserHistory } from 'history'

import CustomRouter from '../src/index'

const history = createBrowserHistory()

describe('Custom link', () => {
    it('throws an error without context property', () => {
        const element = <custom-link />

        expect(element.componentDidCreate.bind(element)).toThrowError(
            'Invariant failed: You should not use <custom-link> without context'
        )
    })

    it('works without "to" property correctly', () => {
        const match = CustomRouter.computeRootMatch('/')
        const location = { pathname: '/' }
        const context = { match, location, history }

        const element = <custom-link context={context} />

        const child = element.render.call(element)

        expect(child).toBeDefined()
        expect(child.tagName).toBe('A')
        expect(child.getAttribute('href')).toBe('')
    })

    it('creates "href" property correctly', () => {
        const match = CustomRouter.computeRootMatch('/')
        const location = { pathname: '/' }
        const context = { match, location, history }

        const element = <custom-link context={context} to="/route" />

        const child = element.render.call(element)

        expect(child).toBeDefined()
        expect(child.getAttribute('href')).toBe('/route')
    })

    it('works correctly with "to" property that is object', () => {
        const match = CustomRouter.computeRootMatch('/')
        const location = { pathname: '/' }
        const context = { match, location, history }
        const to = { pathname: '/route' }

        const element = <custom-link context={context} to={to} />

        const child = element.render.call(element)

        expect(child).toBeDefined()
        expect(child.getAttribute('href')).toBe('/route')
    })

    it('renders children correctly', () => {
        const match = CustomRouter.computeRootMatch('/')
        const location = { pathname: '/' }
        const context = { match, location, history }

        const element = (
            <custom-link context={context} to="/route">
                <div />
                <p />
            </custom-link>
        )

        const child = element.render.call(element)

        expect(child.children.length).toBe(2)
    })

    it('renders text node correctly', () => {
        const match = CustomRouter.computeRootMatch('/')
        const location = { pathname: '/' }
        const context = { match, location, history }

        const element = (
            <custom-link context={context} to="/route">
                Custom link
            </custom-link>
        )

        const child = element.render.call(element)

        expect(child.innerHTML).toBe('Custom link')
    })

    it('passes rest props to the "a"-node correctly', () => {
        const match = CustomRouter.computeRootMatch('/')
        const location = { pathname: '/' }
        const context = { match, location, history }

        const element = (
            <custom-link
                context={context}
                className="link"
                style={{ color: '#000' }}
            >
                Custom link
            </custom-link>
        )

        const child = element.render.call(element)

        expect(child.getAttribute('class')).toBe('link')
        expect(child.getAttribute('style')).toBe('color: rgb(0, 0, 0);')
    })

    it('sets ref to the "a"-node correctly', () => {
        const match = CustomRouter.computeRootMatch('/')
        const location = { pathname: '/' }
        const context = { match, location, history }

        let ref = null

        const setRef = element => (ref = element)

        const element = <custom-link context={context} ref={setRef} />

        element.render.call(element)

        expect(ref).not.toBeNull()
        expect(ref.tagName).toBe('A')
    })

    it('handles onClick correctly', () => {
        const match = CustomRouter.computeRootMatch('/')
        const location = { pathname: '/' }
        const context = { match, location, history }

        let alert = null
        let defaultPrevented = false

        const element = (
            <custom-link
                context={context}
                onClick={() => (alert = 'Clicked')}
            />
        )

        const event = {
            defaultPrevented,
            preventDefault: () => (defaultPrevented = true),
            button: 0,
        }

        element.onClick(event)

        expect(alert).toBe('Clicked')
        expect(defaultPrevented).toBeTruthy()
    })

    it('works with "replace" property correctly', () => {
        const match = CustomRouter.computeRootMatch('/')
        const location = { pathname: '/' }

        let pushWasCalled = false
        let replaceWasCalled = false

        const history = {
            push: () => (pushWasCalled = true),
            replace: () => (replaceWasCalled = true),
        }
        const context = { match, location, history }

        const element = <custom-link context={context} replace />

        const event = {
            defaultPrevented: false,
            preventDefault: () => {},
            button: 0,
        }

        element.onClick(event)

        expect(pushWasCalled).toBeFalsy()
        expect(replaceWasCalled).toBeTruthy()
    })

    it('does not handle modified keys', () => {
        const match = CustomRouter.computeRootMatch('/')
        const location = { pathname: '/' }

        let pushWasCalled = false

        const history = {
            push: () => (pushWasCalled = true),
        }
        const context = { match, location, history }

        const element = <custom-link context={context} />

        const event = {
            defaultPrevented: false,
            preventDefault: () => {},
            button: 0,
            ctrlKey: true,
        }

        element.onClick(event)

        expect(pushWasCalled).toBeFalsy()
    })

    it('does not handle other clicks except left click', () => {
        const match = CustomRouter.computeRootMatch('/')
        const location = { pathname: '/' }

        let pushWasCalled = false

        const history = {
            push: () => (pushWasCalled = true),
        }
        const context = { match, location, history }

        const element = <custom-link context={context} />

        const event = {
            defaultPrevented: false,
            preventDefault: () => {},
            button: 1,
        }

        element.onClick(event)

        expect(pushWasCalled).toBeFalsy()
    })

    it('does not handle already default prevented', () => {
        const match = CustomRouter.computeRootMatch('/')
        const location = { pathname: '/' }

        let pushWasCalled = false

        const history = {
            push: () => (pushWasCalled = true),
        }
        const context = { match, location, history }

        const element = <custom-link context={context} />

        const event = {
            defaultPrevented: true,
            preventDefault: () => {},
            button: 0,
        }

        element.onClick(event)

        expect(pushWasCalled).toBeFalsy()
    })

    it('does not handle other targets except "_self"', () => {
        const match = CustomRouter.computeRootMatch('/')
        const location = { pathname: '/' }

        let pushWasCalled = false

        const history = {
            push: () => (pushWasCalled = true),
        }
        const context = { match, location, history }

        const element = <custom-link context={context} target="_blank" />

        const event = {
            preventDefault: () => {},
            button: 0,
        }

        element.onClick(event)

        expect(pushWasCalled).toBeFalsy()
    })
})
