describe('object-bound/property', function() {
  var obj;

  it('defines Object.prototype.bound', function() {
    expect(Object.prototype.hasOwnProperty('bound')).toBe(true);
  });

  describe('Object.prototype.bound', function() {
    var spy;

    beforeEach(function() {
      obj = {
        f: 1,
        foo: function() { return this.f },

        b: 2,
        bar: function() {  return this.b }
      };
      spyFoo = spyOn(obj.foo, 'bind');
      spyBar = spyOn(obj.bar, 'bind');
    });

    it('binds all methods', function() {
      obj.bound;
      expect(spyFoo).toHaveBeenCalledWith(obj);
      expect(spyBar).toHaveBeenCalledWith(obj);
    });

    it('caches bound methods', function() {
      var foo = obj.bound.foo;
      var bar = obj.bound.bar;

      expect(foo).toBe(obj.bound.foo);
      expect(bar).toBe(obj.bound.bar);
    });

  });

});
