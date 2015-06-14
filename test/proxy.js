/* global beforeEach, describe, it, expect, spyOn */
describe('object-bound/proxy', function () {
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
      obj.bound.foo
      obj.bound.bar

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
      var oldFoo = obj.bound.foo
      var oldBar = obj.bound.bar

      var newFoo = obj.bound.bound.foo // trigger re-cache
      var newBar = obj.bound.bar

      expect(newFoo).not.toBe(oldFoo)
      expect(newFoo).toBe(obj.bound.foo)

      expect(newBar).not.toBe(oldBar)
      expect(newBar).toBe(obj.bound.bar)
    })

    it('re-caches bound methods many times', function () {
      expect(obj.bound.bound.foo).not.toBe(obj.bound.bound.foo)
      expect(obj.bound.bound.bar).not.toBe(obj.bound.bound.bar)
    })

  })

})
