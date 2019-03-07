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
            location: propsLocation,
            context = {},
            path: propsPath,
            from,
            component,
            render,
            ...other
        } = this.props
        let { children } = this.props
        const {
            location: contextLocation = {},
            computedMatch,
            match: contextMatch,
            history,
            staticContext,
        } = context

        const location = propsLocation || contextLocation
        const path = propsPath || from

        const match = computedMatch
            ? computedMatch // <Switch> already computed the match for us
            : path
                ? matchPath(location.pathname, { ...this.props, path })
                : contextMatch

        const props = {
            context: { history, location, match, staticContext },
            ...other,
        }

        if (children.length) {
            children = children.map(child => {
                if (typeof child === 'function') {
                    return child(props)
                }

                return child
            })

            return createFragmentWithChildren(children, props)
        }

        if (match) {
            if (render) {
                return render(props)
            }

            if (component) {
                return createElement(component, props)
            }

            return null
        }

        return null
    }
}

if (!window.customElements.get('custom-route'))
    window.customElements.define('custom-route', CustomRoute)
