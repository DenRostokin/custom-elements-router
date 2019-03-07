import matchPath, { compilePath } from '../src/matchPath'

describe('matchPath function', () => {
    it('doesn`t throw an error without parameters and returns null', () => {
        expect(matchPath).not.toThrow()
        expect(matchPath()).toBeNull()
    })

    it('returns null if second parameter is not passed', () => {
        const match = matchPath('/route')

        expect(match).toBeNull()
    })

    it('compares equal paths correctly', () => {
        const pathname = '/route'
        const path = pathname
        const match = matchPath(pathname, { path })

        expect(match).not.toBeNull()
        expect(match).toEqual({
            path: '/route',
            url: '/route',
            isExact: true,
            params: {},
        })
    })

    it('reseives second parameter as string correctly', () => {
        const pathname = '/route'
        const path = pathname
        const match = matchPath(pathname, path)

        expect(match).not.toBeNull()
        expect(match).toEqual({
            path: '/route',
            url: '/route',
            isExact: true,
            params: {},
        })
    })

    it('receives array of paths correctly', () => {
        const path = ['/route', '/']
        const pathname = '/route'
        const match = matchPath(pathname, path)

        expect(match).not.toBeNull()
        expect(match).toEqual({
            path: '/route',
            url: '/route',
            isExact: true,
            params: {},
        })
    })

    it('receives array of paths nested in object correctly', () => {
        const path = ['/route', '/']
        const pathname = '/route'
        const match = matchPath(pathname, { path })

        expect(match).not.toBeNull()
        expect(match).toEqual({
            path: '/route',
            url: '/route',
            isExact: true,
            params: {},
        })
    })

    it('resolves exact path correctly', () => {
        const pathname = '/route'
        const path = '/'
        let match = matchPath(pathname, { path, exact: true })

        expect(match).toBeNull()

        match = matchPath(pathname, path)

        expect(match).not.toBeNull()
        expect(match).toEqual({
            path: '/',
            url: '/',
            isExact: false,
            params: {},
        })
    })

    it('resolves sensitive path correctly', () => {
        const pathname = '/ROUTE'
        const path = '/route'
        let match = matchPath(pathname, path)

        expect(match).not.toBeNull()
        expect(match).toEqual({
            path: '/route',
            url: '/ROUTE',
            isExact: true,
            params: {},
        })

        match = matchPath(pathname, { path, sensitive: true })

        expect(match).toBeNull()
    })

    it('resolves strict path correctly', () => {
        const pathname = '/route/'
        const path = '/route'
        let match = matchPath(pathname, path)

        expect(match).not.toBeNull()
        expect(match).toEqual({
            path: '/route',
            url: '/route/',
            isExact: true,
            params: {},
        })

        match = matchPath(pathname, { path, strict: true })

        expect(match).not.toBeNull()
        expect(match).toEqual({
            path: '/route',
            url: '/route',
            isExact: false,
            params: {},
        })
    })

    it('resolves params correctly', () => {
        const pathname = '/route/value'
        const path = '/route/:id'
        const match = matchPath(pathname, { path })

        expect(match).not.toBeNull()
        expect(match).toEqual({
            path: '/route/:id',
            url: '/route/value',
            isExact: true,
            params: { id: 'value' },
        })
    })
})

describe('compilePath function', () => {
    it('create regext with end property as true correctly', () => {
        const { regexp } = compilePath('/route')

        expect(regexp).toEqual(/^\/route(?:\/)?$/i)
    })

    it('creates regexp and keys correctly', () => {
        const { regexp, keys } = compilePath('/route/:id')

        expect(regexp).toEqual(/^\/route\/([^\/]+?)(?:\/)?$/i)
        expect(keys).toEqual([
            {
                name: 'id',
                prefix: '/',
                delimiter: '/',
                optional: false,
                repeat: false,
                pattern: '[^\\/]+?',
            },
        ])
    })

    it('creates regexp with end property as false correctly', () => {
        const { regexp } = compilePath('/route', { end: false })

        expect(regexp).toEqual(/^\/route(?:\/(?=$))?(?=\/|$)/i)
    })

    it('creates sensitive regexp correctly', () => {
        const { regexp } = compilePath('/route', { sensitive: true })

        expect(regexp).toEqual(/^\/route(?:\/)?$/)
    })

    it('creates strict regexp correctly', () => {
        const { regexp } = compilePath('/route', { strict: true })

        expect(regexp).toEqual(/^\/route$/i)
    })
})
