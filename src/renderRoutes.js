import invariant from 'tiny-invariant'

import matchPath from './matchPath'
import createElement from './createElement'

const renderRoutes = (routes = [], context) => {
    invariant(context, 'You should not use renderRoutes without context')

    const { location, match: contextMatch } = context || {}

    const [route = {}, match] = routes.reduce((matched, route) => {
        if (matched.length) return matched

        const match =
            route.path || route.from
                ? matchPath(location.pathname, route)
                : contextMatch

        return match ? [route, match] : []
    }, [])

    const props = { route, context: { ...context, match } }

    if (route.render) {
        return route.render(props)
    }

    if (route.component) {
        return createElement(route.component, props)
    }

    return null
}

export default renderRoutes
