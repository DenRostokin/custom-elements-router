import jsx, { Component } from 'custom-elements-jsx'
import { createMemoryHistory as createHistory } from 'history'
import warning from 'tiny-warning'

class MemoryRouter extends Component {
    componentDidCreate() {
        warning(
            !this.props.history,
            '<MemoryRouter> ignores the history prop. To use a custom history, ' +
                'use `import { Router }` instead of `import { MemoryRouter as Router }`.'
        )

        this.history = createHistory(this.props)
    }

    render() {
        return (
            <custom-router history={this.history}>
                {this.props.children}
            </custom-router>
        )
    }
}

if (!window.customElements.get('custom-memory-router'))
    window.customElements.define('custom-memory-router', MemoryRouter)
