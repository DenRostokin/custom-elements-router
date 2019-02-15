import jsx, { Component } from 'custom-elements-jsx'
import { createHashHistory as createHistory } from 'history'
import warning from 'tiny-warning'

class HashRouter extends Component {
    componentDidCreate() {
        warning(
            !this.props.history,
            '<HashRouter> ignores the history prop. To use a custom history, ' +
                'use `import { Router }` instead of `import { HashRouter as Router }`.'
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

if (!window.customElements.get('custom-hash-router'))
    window.customElements.define('custom-hash-router', HashRouter)
