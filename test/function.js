/* global beforeEach, describe, it, expect, spyOn */
describe('object-bound/function', function () {
  var obj

  it('defines Object.prototype.bound', function () {
    expect(Object.prototype.hasOwnProperty('bound')).toBe(true)
    expect(typeof Object.prototype.bound).toBe('function')
  })

  describe('Object.prototype.bound', function () {
    var spy

    beforeEach(function () {
      obj = { foo: function () {} }
    })

    describe('with no arguments', function () {
      beforeEach(function () {
        spy = spyOn(Function.prototype.bind, 'call')
      })

      it('delegates error handling to Function.prototype.bind', function () {
        obj.bound()
        expect(spy).toHaveBeenCalledWith(undefined)
      })

    })

    describe('with some arguments', function () {
      beforeEach(function () {
        spy = spyOn(Function.prototype.bind, 'call')
      })

      it('delegates error handling to Function.prototype.bind', function () {
        obj.bound('notfound')
        expect(spy).toHaveBeenCalledWith(undefined, obj)
      })

      it('binds correct context', function () {
        obj.bound('foo')
        expect(spy).toHaveBeenCalledWith(obj.foo, obj)
      })

      it('binds all arguments', function () {
        obj.bound('foo', 1)
        expect(spy).toHaveBeenCalledWith(obj.foo, obj, 1)

        obj.bound('foo', 1, 2)
        expect(spy).toHaveBeenCalledWith(obj.foo, obj, 1, 2)

        obj.bound('foo', 1, 2, 3)
        expect(spy).toHaveBeenCalledWith(obj.foo, obj, 1, 2, 3)

        obj.bound('foo', 1, 2, 3, 4)
        expect(spy).toHaveBeenCalledWith(obj.foo, obj, 1, 2, 3, 4)

        obj.bound('foo', 1, 2, 3, 4, 5)
        expect(spy).toHaveBeenCalledWith(obj.foo, obj, 1, 2, 3, 4, 5)

        obj.bound('foo', 1, 2, 3, 4, 5, 6)
        expect(spy).toHaveBeenCalledWith(obj.foo, obj, 1, 2, 3, 4, 5, 6)

        obj.bound('foo', 1, 2, 3, 4, 5, 6, 7)
        expect(spy).toHaveBeenCalledWith(obj.foo, obj, 1, 2, 3, 4, 5, 6, 7)
      })
    })

    describe('with many arguments', function () {
      beforeEach(function () {
        spy = spyOn(Function.prototype.bind, 'apply')
      })

      it('delegates error handling to Function.prototype.bind', function () {
        obj.bound('notfound', 1, 2, 3, 4, 5, 6, 7, 8)
        expect(spy).toHaveBeenCalledWith(undefined, [ obj, 1, 2, 3, 4, 5, 6, 7, 8 ])
      })

      it('binds correct context and all arguments', function () {
        obj.bound('foo', 1, 2, 3, 4, 5, 6, 7, 8)
        expect(spy).toHaveBeenCalledWith(obj.foo, [ obj, 1, 2, 3, 4, 5, 6, 7, 8 ])
      })
    })

  })

  describe('bound function', function () {
    beforeEach(function () {
      obj = {
        a: 1,
        sum: function () {
          var sum = 0, len = arguments.length
          for (var i = 0; i < len; i++) sum += arguments[i]
          return this.a + sum
        }
      }
    })

    it('throws an error without arguments', function () {
      expect(function () { obj.bound()() }).toThrowError(TypeError)
    })

    it('throws an error with invalid method name', function () {
      expect(function () { obj.bound('notfound')() }).toThrowError(TypeError)
    })

    it('works as expected with no additional arguments', function () {
      expect(obj.bound('sum')()).toBe(1)
      expect(obj.bound('sum')(10)).toBe(11)
      expect(obj.bound('sum')(10, 100)).toBe(111)
    })

    it('works as expected with one additional argument', function () {
      expect(obj.bound('sum', 10)()).toBe(11)
      expect(obj.bound('sum', 10)(100)).toBe(111)
    })

    it('works as expected with several additional arguments', function () {
      expect(obj.bound('sum', 10, 100)()).toBe(111)
    })

    it('works as expected with many additional arguments', function () {
      expect(obj.bound('sum', 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000)()).toBe(111111111)
    })
  })

})
