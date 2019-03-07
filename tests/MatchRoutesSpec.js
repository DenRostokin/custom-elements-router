import CustomRouter, { matchRoutes } from '../src/index'

describe('matchRoutes function', () => {
    it('does not throw an error and returns empty array without parameters', () => {
        expect(matchRoutes).not.toThrow()
        expect(matchRoutes()).toEqual([])
    })

    it('does not throw an error without pathname', () => {
        const routes = [
            {
                path: '/',
                component: 'div',
            },
        ]

        const matched = matchRoutes(routes)

        expect(matched).toEqual([])
    })

    it('matches routes correctly', () => {
        const routes = [
            {
                path: '/route',
                component: 'matched-route',
            },
        ]
        const pathname = '/route'

        const matched = matchRoutes(routes, pathname)

        expect(matched.length).toBeGreaterThan(0)
        expect(matched).toEqual([
            {
                route: routes[0],
                match: {
                    path: '/route',
                    url: '/route',
                    isExact: true,
                    params: {},
                },
            },
        ])
    })

    it('matches routes with "from" property correctly', () => {
        const routes = [
            {
                from: '/route',
                component: 'matched-route',
            },
        ]
        const pathname = '/route'

        const matched = matchRoutes(routes, pathname)

        expect(matched.length).toBeGreaterThan(0)
        expect(matched).toEqual([
            {
                route: routes[0],
                match: {
                    path: '/route',
                    url: '/route',
                    isExact: true,
                    params: {},
                },
            },
        ])
    })

    it('matches nested routes correctly', () => {
        const routes = [
            {
                path: '/',
                component: 'root-route',
                routes: [
                    {
                        path: '/nested',
                        component: 'nested-route',
                    },
                ],
            },
        ]
        const pathname = '/nested'

        const matched = matchRoutes(routes, pathname)

        expect(matched.length).toBeGreaterThan(0)
        expect(matched[0]).toEqual({
            route: {
                path: '/',
                component: 'root-route',
                routes: [
                    {
                        path: '/nested',
                        component: 'nested-route',
                    },
                ],
            },
            match: {
                path: '/',
                url: '/',
                isExact: false,
                params: {},
            },
        })

        expect(matched[1]).toEqual({
            route: {
                path: '/nested',
                component: 'nested-route',
            },
            match: {
                path: '/nested',
                url: '/nested',
                isExact: true,
                params: {},
            },
        })
    })

    it('returns route with previous "match" object if "path" is not specified', () => {
        const routes = [
            {
                path: '/',
                component: 'root-route',
                routes: [
                    {
                        component: 'nested-route',
                    },
                ],
            },
        ]
        const pathname = '/nested'

        const matched = matchRoutes(routes, pathname)

        const rootMatch = {
            path: '/',
            url: '/',
            isExact: false,
            params: {},
        }

        expect(matched.length).toBeGreaterThan(0)
        expect(matched[0]).toEqual({
            route: {
                path: '/',
                component: 'root-route',
                routes: [
                    {
                        component: 'nested-route',
                    },
                ],
            },
            match: rootMatch,
        })

        expect(matched[1]).toEqual({
            route: {
                component: 'nested-route',
            },
            match: rootMatch,
        })
    })

    it('returns computeRootMatch "match" if root route does not have "path" property', () => {
        const routes = [
            {
                component: 'root-route',
            },
        ]
        const pathname = '/someroute'

        const matched = matchRoutes(routes, pathname)

        expect(matched.length).toBe(1)
        expect(matched).toEqual([
            {
                route: {
                    component: 'root-route',
                },
                match: CustomRouter.computeRootMatch(pathname),
            },
        ])
    })
})
