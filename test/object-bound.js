describe('Object bound', function() {
  var obj;

  it('defines Object.prototype.bound', function() {
    expect(Object.prototype.hasOwnProperty('bound')).toBe(true);
    expect(typeof Object.prototype.bound).toBe('function');
  });

  describe('Object.prototype.bound', function() {
    var spy;

    beforeEach(function() {
      obj = { foo: function() {} };
      spy = spyOn(Function.prototype.bind, "apply");
    });

    describe('with no arguments', function() {

      it('delegates error handling to Function.prototype.bind', function() {
        obj.bound();
        expect(spy).toHaveBeenCalledWith(undefined, [ obj ]);
      });

    });

    describe('with function name provided', function() {

      it('passes correct context to Function.prototype.bind', function() {
        obj.bound("foo");
        expect(spy).toHaveBeenCalledWith(obj.foo, [ obj ]);
      });
    });

    describe('with some arguments', function() {

      it('passes all arguments to Function.prototype.bind', function() {
        obj.bound("foo", 1);
        expect(spy).toHaveBeenCalledWith(obj.foo, [ obj, 1 ]);

        obj.bound("foo", 1, 2);
        expect(spy).toHaveBeenCalledWith(obj.foo, [ obj, 1, 2 ]);
      });
    });

  });

  describe('bound function', function() {

    beforeEach(function() {
      obj = {
        a: 1,
        sum: function(b, c) {
          return this.a + (b || 0) + (c || 0);
        }
      };
    });

    it('works as expected with no additional arguments', function() {
      expect(obj.bound("sum")()).toBe(1);
      expect(obj.bound("sum")(10)).toBe(11);
      expect(obj.bound("sum")(10, 100)).toBe(111);
    });

    it('works as expected with one additional argument', function() {
      expect(obj.bound("sum", 10)()).toBe(11);
      expect(obj.bound("sum", 10)(100)).toBe(111);
    });

    it('works as expected with several additional arguments', function() {
      expect(obj.bound("sum", 10, 100)()).toBe(111);
    });
  });

});
