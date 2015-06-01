/**
 * Object.prototype.bound: The opposite side of Function.prototype.bind.
 * Copyright (c) 2015 Vladislav Zarakovsky
 * MIT license https://github.com/vlazar/object-bound/blob/master/LICENSE
 */
(function() {

  var bind = Function.prototype.bind;

  Object.prototype.bound = function(name) {
    var len = arguments.length, args = new Array(len);
    args[0] = this;
    for (var i = 1; i < len; i++) args[i] = arguments[i];

    return bind.apply(this[name], args);
  };

})();
