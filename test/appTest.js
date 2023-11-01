const assert = require('chai').assert;
const Mtrx = require('..')
const clone = require('../src/clone')
const reset = require('../src/reset')
const transpose = require('../src/transpose')
const rank = require('../src/rank')
const range = require('../src/range')
const multiply = require('../src/multiply')
const { isNumberArray } = require('../src/lang')
const isSquare = require('../src/isSquare')
const isSameShape = require('../src/isSameShape')
const isMtrxLike = require('../src/isMtrxLike')
const isSingular = require('../src/isSingular')

describe('Mtrx', function () {

    it('receive a matrix and return a new equaltions matrix', function () {
        let matrix = [[1, 2, 3], [4, 5, 6]]
        let c = clone(matrix)
        assert.deepStrictEqual(c, matrix)
    })

    it('return a new matrix that is deep copy', function () {
        let matrix = [[1, 2, 3], [4, 5, 6]]
        let c = clone(matrix)
        c[0][0] = 0
        assert.notDeepEqual(c, matrix)
    })

    it('return a new matrix that is param-matrix\'transpose', function () {
        let a = [[1, 2, 3], [4, 5, 6]]
        assert.deepStrictEqual(transpose(a), [[1, 4], [2, 5], [3, 6]])
        assert.deepStrictEqual(a, [[1, 2, 3], [4, 5, 6]])
    })

    it('it will change param', function () {
        let a = [[2, 3, 4], [9, 9, 2]],
            b = [[1, 3], [2, 1], [2, 1]]
        assert.notDeepEqual(a, b)
        reset(a, b)
        assert.deepStrictEqual(a, b)
    })


    it('rank -- return a number', function () {
        let a = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
        assert.equal(rank(a), 2)

        let b = [[1, 2, 3, 4], [2, 9, 8, 2], [1, 0, 8, 8]]
        assert.equal(rank(b), 3)

        let c = [[0, 0, 0], [0, 0, 0]]
        assert.equal(rank(c), 0)

        let d = [[0]]
        assert.equal(rank(d), 0)
    })

    it('return a array', function () {
        assert.deepStrictEqual(range(6), [0, 1, 2, 3, 4, 5])
    })

    it('return a empty array, if it accept a param that is 0 or neg', function () {
        assert.deepStrictEqual(range(-6), [])
        assert.deepStrictEqual(range(0), [])
    })

    it('two params', function () {
        assert.deepStrictEqual(range(3, 9), [3, 4, 5, 6, 7, 8])
        assert.deepStrictEqual(range(-3, 9), [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8])
    })

    it('three params', function () {
        assert.deepStrictEqual(range(3, 9, 3), [3, 6])
        assert.deepStrictEqual(range(9, -3, -2), [9, 7, 5, 3, 1, -1])
    })

    it('return a new matrix', function () {
        let a = [[8, 3, 1], [2, 1, 9], [2, 3, 0]]
        assert.deepStrictEqual(multiply(a, a), [[72, 30, 35], [36, 34, 11], [22, 9, 29]])

    })

    it('n*n multiply n*1', function () {
        let a = [[8, 3, 1], [2, 1, 9], [2, 3, 0]]
        let b = [[1], [2], [3]]
        assert.deepStrictEqual(multiply(a, b), [[17], [31], [8]])
    })

    it('is number array?', function () {
        let a = [1, 3, 4, 5]
        assert.strictEqual(isNumberArray(a), true)

        let b = [undefined, 0]
        assert.strictEqual(isNumberArray(b), false)

        let c = [null, 0, 0]
        assert.strictEqual(isNumberArray(c), false)
    })

    it('Array has space position', function () {
        let d = [, , 0, 1]
        assert.strictEqual(isNumberArray(d), false)
    })

    it('check square', function () {
        let a = [[1, 2, 3], [2, 3, 3], [3, 5, 4]]
        assert.strictEqual(isSquare(a), true)

        let b = [[0]]
        assert.strictEqual(isSquare(b), true)

        let c = [[1, 2, 3], [9, 0, 2]]
        assert.strictEqual(isSquare(c), false)
    })

    it('check singular', function () {
        let a = [[1, 2, 3], [3, 1, 4], [1, 3, 4]]
        assert.strictEqual(isSingular(a), true)

        let b = [[1, 2, 3], [0, 0, 0], [1, 3, 4]]
        assert.strictEqual(isSingular(b), true)

        let c = [[2, 0, 3], [4, 0, 6], [1, 3, 4]]
        assert.strictEqual(isSingular(c), true)

        let d = [[2, 3, 4], [1, 2, 1], [8, 7, 2]]
        assert.strictEqual(isSingular(d), false)
    })

    it('is same shape', function () {
        let a = [[1, 2, 3], [2, 3, 4]]
        let b = [[3, 4, 1], [2, 3, 1]]
        assert.strictEqual(isSameShape(a, b), true)
    })

    it('same matrix?', function() {
        let a = [[1, 2, 3], [2, 3, 5]]
        assert.strictEqual(isMtrxLike(a), true)
    
        let b = [[1, 2, 4], [3, 2]]
        assert.strictEqual(isMtrxLike(b), false)
    
        let c = [[undefined, 1, 3], [2, 3, 4]]
        assert.strictEqual(isMtrxLike(c), false)
    
        let d = [['a', 2, 3], [3, 2, 4]]
        assert.strictEqual(isMtrxLike(d), false)
      })

})
