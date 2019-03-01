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
        const location = { pathname: '/' }
        const context = { match, location }

        const element = (
            <custom-switch context={context}>
                <root-element-for-switch id="rootElementForSwitch" path="/" />
                <side-element-for-switch
                    id="sideElementForSwitch"
                    path="/side"
                    exact
                />
            </custom-switch>
        )
    })
})
