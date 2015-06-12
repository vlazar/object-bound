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

    it('re-caches on demand', function () {
      var foo = obj.bound.foo
      var bar = obj.bound.bar
      var newFoo = obj.bound.bound.foo // .bound.bound triggers re-cache
      var newBar = obj.bound.bar

      expect(newFoo).not.toBe(foo)
      expect(newFoo).toBe(obj.bound.foo)
      expect(newBar).not.toBe(bar)
      expect(newBar).toBe(obj.bound.bar)
    })

  })

})
