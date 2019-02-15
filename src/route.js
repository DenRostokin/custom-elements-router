import jsx, { Component, createFragmentWithChildren } from 'custom-elements-jsx'
import invariant from 'tiny-invariant'

import matchPath from './matchPath'
import createElement from './createElement'

class CustomRoute extends Component {
    componentDidCreate() {
        invariant(
            this.props.context,
            'You should not use <custom-route> without context'
        )
    }

    render() {
        const {
            children,
            location: propsLocation,
            context = {},
            path,
            component,
            render,
            ...other
        } = this.props
        const {
            location: contextLocation = {},
            computedMatch,
            match: contextMatch,
            history,
            staticContext,
        } = context
        const location = propsLocation || contextLocation
        const match = computedMatch
            ? computedMatch // <Switch> already computed the match for us
            : path
                ? matchPath(location.pathname, this.props)
                : contextMatch
        const props = {
            context: { history, location, match, staticContext },
            ...other,
        }

        if (typeof children === 'function') {
            return children(props)
        }

        if (children && children.length) {
            return createFragmentWithChildren(children, props)
        }

        if (render) {
            return render(props)
        }

        if (component) {
            return createElement(component, props)
        }

        return null
    }
}

if (!window.customElements.get('custom-route'))
    window.customElements.define('custom-route', CustomRoute)
