import jsx, { Component } from 'custom-elements-jsx'

describe('single test', () => {
    it('runs correctly', () => {
        class CustomElement extends Component {
            render() {
                return <div>Hello</div>
            }
        }

        window.customElements.define('custom-element', CustomElement)

        const element = <custom-element />

        document.body.appendChild(element)

        expect(element.outerHTML).toBe(
            '<custom-element><div>Hello</div></custom-element>'
        )

        document.body.removeChild(element)
    })
})
