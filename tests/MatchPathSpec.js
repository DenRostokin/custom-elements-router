import matchPath from '../src/matchPath'

describe('matchPath function', () => {
    it('doesn`t throw an error without options and returns null', () => {
        expect(matchPath).not.toThrow()
        expect(matchPath()).toBeNull()
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

    // it('receives array of paths correctly', () => {
    //     const path = ['/', '/route']
    //     const pathname = '/route'
    //     const match = matchPath(pathname, path)

    //     expect(match).not.toBeNull()
    //     expect(match).toEqual({
    //         path: '/route',
    //         url: '/route',
    //         isExact: true,
    //         params: {},
    //     })
    // })

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
