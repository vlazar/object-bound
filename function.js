/**
 * Object.prototype.bound() function: The opposite side of Function.prototype.bind.
 * Copyright (c) 2015 Vladislav Zarakovsky
 * MIT license https://github.com/vlazar/object-bound/blob/master/LICENSE
 *
 * It is very fast! Adds as little overhead as possible: https://jsperf.com/object-bound
 * Special thanks to an amazing https://github.com/codemix/fast.js
 */
(function () {
  var bind = Function.prototype.bind

  /* eslint-disable no-extend-native */
  Object.defineProperty(Object.prototype, 'bound', {
    configurable: true,
    value: boundMethod
  })

  function boundMethod (name) {
    var self = this
    var method = self[name]

    // inlined version of applyWithContext() from fast.js
    switch (arguments.length) {
      case 0:
        return bind.call(method)
      case 1:
        return bind.call(method, self)
      case 2:
        return bind.call(method, self, arguments[1])
      case 3:
        return bind.call(method, self, arguments[1], arguments[2])
      case 4:
        return bind.call(method, self, arguments[1], arguments[2], arguments[3])
      case 5:
        return bind.call(method, self, arguments[1], arguments[2], arguments[3], arguments[4])
      case 6:
        return bind.call(method, self, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
      case 7:
        return bind.call(method, self, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6])
      case 8:
        return bind.call(method, self, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7])

      default:
        var args = fastCloneArguments.apply(null, arguments)
        // not inlining this into fastCloneArguments gives better performance in Firefox
        args[0] = self

        return bind.apply(method, args)
    }
  }

  // Modified version of fastCloneArray() from fast.js for use with arguments.
  // Use fastCloneArguments.apply(null, arguments), not fastCloneArguments(arguments)!
  // See benchmark http://jsperf.com/fast-js-fastclonearray-with-arguments
  // More details https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#what-is-safe-arguments-usage
  function fastCloneArguments () {
    var len = arguments.length,
      args = new Array(len),
      i

    for (i = 0; i < len; i++) {
      args[i] = arguments[i]
    }

    return args
  }

})()
