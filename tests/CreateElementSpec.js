import createElement from '../src/createElement'

describe('createElement function', () => {
    it('creates HTMLElement correctly', () => {
        const element = createElement('div')

        expect(element.tagName).toBe('DIV')
    })

    it('adds props to created element correctly', () => {
        const props = { value: 'hello' }
        const element = createElement('div', props)

        expect('props' in element).toBeTruthy()
        expect('value' in element.props).toBeTruthy()
        expect(element.props.value).toBe('hello')
    })
})
