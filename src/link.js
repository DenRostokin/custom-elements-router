import jsx, { Component } from 'custom-elements-jsx'
import { createLocation } from 'history'
import invariant from 'tiny-invariant'

const isModifiedEvent = event =>
    !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)

class CustomLink extends Component {
    componentDidCreate() {
        invariant(
            this.props.context,
            'You should not use <custom-link> without context'
        )
    }

    onClick = event => {
        const { context = {}, to, replace, onClick, target } = this.props
        const { history } = context

        if (onClick) onClick(event)

        if (
            !event.defaultPrevented && // onClick prevented default
            event.button === 0 && // ignore everything but left clicks
            (!target || target === '_self') && // let browser handle "target=_blank" etc.
            !isModifiedEvent(event) // ignore clicks with modifier keys
        ) {
            event.preventDefault()

            if (history) {
                const method = replace ? history.replace : history.push

                method(to)
            }
        }
    }

    render() {
        const {
            /* eslint-disable-next-line */
            id,
            ref,
            to,
            children,
            context = {},
            /* eslint-disable-next-line */
            replace,
            ...rest
        } = this.props
        const location =
            typeof to === 'string'
                ? createLocation(to, null, null, context.location)
                : to
        const href = location ? context.history.createHref(location) : ''
        const otherProps = ref
            ? {
                ...rest,
                ref,
            }
            : rest

        return (
            <a {...otherProps} href={href} onClick={this.onClick}>
                {children}
            </a>
        )
    }
}

if (!window.customElements.get('custom-link'))
    window.customElements.define('custom-link', CustomLink)
