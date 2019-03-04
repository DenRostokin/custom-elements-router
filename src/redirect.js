import jsx, { Component } from 'custom-elements-jsx'
import { createLocation } from 'history'
import invariant from 'tiny-invariant'

class CustomRedirect extends Component {
    componentDidCreate() {
        invariant(
            this.props.context,
            'You should not use <custom-redirect> without context'
        )

        const { route, context = {}, to, push = false } = this.props
        const { history } = context

        // if we use custom-redirect inside of routes that we pass to the custom-router
        // the we should use values from route object. otherwise we use values from props
        const redirectTo = route ? route.to : to
        const redirectPush = route ? route.push : push

        const location = createLocation(redirectTo)
        const method = redirectPush ? history.push : history.replace

        method(location)
    }
}

if (!window.customElements.get('custom-redirect'))
    window.customElements.define('custom-redirect', CustomRedirect)
