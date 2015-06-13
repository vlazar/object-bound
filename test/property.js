/* global beforeEach, describe, it, expect, spyOn */
describe('object-bound/property', function () {
  var obj

  it('defines Object.prototype.bound', function () {
    expect(Object.prototype.hasOwnProperty('bound')).toBe(true)
  })

  describe('Object.prototype.bound', function () {
    var spyFoo, spyBar

    beforeEach(function () {
      obj = {
        f: 1,
        foo: function () { return this.f },

        b: 2,
        bar: function () { return this.b }
      }
      spyFoo = spyOn(obj.foo, 'bind').and.callThrough()
      spyBar = spyOn(obj.bar, 'bind').and.callThrough()
    })

    it('binds all methods', function () {
      obj.bound
      expect(spyFoo).toHaveBeenCalledWith(obj)
      expect(spyBar).toHaveBeenCalledWith(obj)
    })

    it('caches bound methods', function () {
      var foo = obj.bound.foo
      var bar = obj.bound.bar

      expect(foo).toBe(obj.bound.foo)
      expect(bar).toBe(obj.bound.bar)
    })

    it('re-caches bound methods once', function () {
      var oldBound = obj.bound
      var newBound = obj.bound.bound // trigger re-cache

      expect(newBound.foo).not.toBe(oldBound.foo)
      expect(newBound.foo).toBe(obj.bound.foo)

      expect(newBound.bar).not.toBe(oldBound.bar)
      expect(newBound.bar).toBe(obj.bound.bar)
    })

    it('re-caches bound methods many times', function () {
      expect(obj.bound.bound.foo).not.toBe(obj.bound.bound.foo)
      expect(obj.bound.bound.bar).not.toBe(obj.bound.bound.bar)
    })

  })

})
