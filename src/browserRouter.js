import jsx, { Component } from 'custom-elements-jsx'
import { createBrowserHistory as createHistory } from 'history'
import warning from 'tiny-warning'

class BrowserRouter extends Component {
    componentDidCreate() {
        warning(
            !this.props.history,
            '<BrowserRouter> ignores the history prop. To use a custom history, ' +
                'use `import { Router }` instead of `import { BrowserRouter as Router }`.'
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

if (!window.customElements.get('custom-browser-router'))
    window.customElements.define('custom-browser-router', BrowserRouter)
