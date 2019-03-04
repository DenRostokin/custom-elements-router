import jsx from 'custom-elements-jsx'
import { createBrowserHistory } from 'history'

import CustomRouter from '../src/index'

const history = createBrowserHistory()

describe('Custom nav link', () => {
    it('throws an error without context property', () => {
        const element = <custom-nav-link />

        expect(element.componentDidCreate.bind(element)).toThrowError(
            'Invariant failed: You should not use <custom-nav-link> without context'
        )
    })

    it('joins className and activeClassName correctly', () => {
        const match = CustomRouter.computeRootMatch('/')
        const location = { pathname: '/route' }
        const context = { match, location, history }

        const element = (
            <custom-nav-link
                context={context}
                to="/route"
                className="navLink"
                activeClassName="navLink-isActive"
            />
        )

        const child = element.render.call(element)

        expect(child.props.className).toBe('navLink navLink-isActive')
    })

    it('joins style and activeStyle correctly', () => {
        const match = CustomRouter.computeRootMatch('/')
        const location = { pathname: '/route' }
        const context = { match, location, history }

        const element = (
            <custom-nav-link
                context={context}
                to="/route"
                style={{ fontSize: '16px', color: '#000' }}
                activeStyle={{ color: '#fff' }}
            />
        )

        const child = element.render.call(element)

        expect(child.props.style).toEqual({
            fontSize: '16px',
            color: '#fff',
        })
    })

    it('adds "active" class to the className without activeClassName', () => {
        const match = CustomRouter.computeRootMatch('/')
        const location = { pathname: '/route' }
        const context = { match, location, history }

        const element = (
            <custom-nav-link
                context={context}
                to="/route"
                className="navLink"
            />
        )

        const child = element.render.call(element)

        expect(child.props.className).toBe('navLink active')
    })

    it('applies only activeClassName without className', () => {
        const match = CustomRouter.computeRootMatch('/')
        const location = { pathname: '/route' }
        const context = { match, location, history }

        const element = (
            <custom-nav-link
                context={context}
                to="/route"
                activeClassName="navLink-isActive"
            />
        )

        const child = element.render.call(element)

        expect(child.props.className).toBe('navLink-isActive')
    })

    it('does not apply activeClassName without routes matching', () => {
        const match = CustomRouter.computeRootMatch('/')
        const location = { pathname: '/side' }
        const context = { match, location, history }

        const element = (
            <custom-nav-link
                context={context}
                to="/route"
                className="navLink"
                activeClassName="navLink-isActive"
            />
        )

        const child = element.render.call(element)

        expect(child.props.className).toBe('navLink')
    })
})
