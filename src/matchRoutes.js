import matchPath from './matchPath'
import CustomRouter from './index'

const matchRoutes = (routes = [], pathname) =>
    routes.reduce((acc, route) => {
        const path = route.path || route.from
        const match = path
            ? matchPath(pathname, route)
            : acc.length
                ? acc[acc.length - 1].match
                : CustomRouter.computeRootMatch(pathname)

        if (match) {
            const routesMatch = route.routes
                ? matchRoutes(route.routes, pathname)
                : []

            return [...acc, { route, match }, ...routesMatch]
        }

        return acc
    }, [])

export default matchRoutes
