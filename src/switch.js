import jsx, { Component } from 'custom-elements-jsx'
import invariant from 'tiny-invariant'

import matchPath from './matchPath'

class CustomSwitch extends Component {
    componentDidCreate() {
        invariant(
            this.props.context,
            'You should not use <custom-switch> without context'
        )
    }

    render() {
        const { children = [], context = {} } = this.props
        const { location = {}, match: contextMatch } = context

        const [element, match] = children.reduce((matched, child) => {
            if (matched.length) return matched

            const path = child.props.path || child.props.from
            const childMatch = path
                ? matchPath(location.pathname, { ...child.props, path })
                : contextMatch

            return childMatch ? [child, childMatch] : []
        }, [])

        if (element) {
            element.props.context = {
                ...element.props.context,
                ...context,
                computedMatch: match,
            }

            return element
        }

        return null
    }
}

if (!window.customElements.get('custom-switch'))
    window.customElements.define('custom-switch', CustomSwitch)
