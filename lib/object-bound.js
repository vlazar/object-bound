/**
 * Object.prototype.bound: The opposite side of Function.prototype.bind.
 * Copyright (c) 2015 Vladislav Zarakovsky
 * MIT license https://github.com/vlazar/object-bound/blob/master/LICENSE
 */
(function() {

  var slice = Array.prototype.slice;
  var bind = Function.prototype.bind;

  Object.prototype.bound = function(name) {
    var args = slice.call(arguments, 1);
    args.unshift(this);

    return bind.apply(this[name], args);
  };

})();
