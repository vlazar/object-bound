/**
 * Object.prototype.bound() function: The opposite side of Function.prototype.bind.
 * Copyright (c) 2015 Vladislav Zarakovsky
 * MIT license https://github.com/vlazar/object-bound/blob/master/LICENSE
 *
 * It is very fast! Adds as little overhead as possible: https://jsperf.com/object-bound
 * Special thanks to an amazing https://github.com/codemix/fast.js
 */
(function () {
  var bind = Function.prototype.bind,
    defineProperty = Object.defineProperty

  defineProperty(Object.prototype, 'bound', {
    configurable: true,
    value: boundMethod
  })

  function boundMethod (name) {
    var self = this,
      method = self[name],
      len = arguments.length

    // inlined version of applyWithContext() from fast.js
    switch (len) {
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
        // inlined version of fastCloneArray() from fast.js
        var args = new Array(len)

        for (var i = 1; i < len; i++) {
          args[i] = arguments[i]
        }
        args[0] = self

        return bind.apply(method, args)
    }
  }

})()
