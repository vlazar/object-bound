/**
 * Object.prototype.bound proxy: Cached function to object binding.
 * Copyright (c) 2015 Vladislav Zarakovsky
 * MIT license https://github.com/vlazar/object-bound/blob/master/LICENSE
 *
 * EXPERIMENTAL (!)
 * Uses ES6 Proxy, which is currently only available in Firefox and Microsoft Edge
 * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Proxy
 */
(function () {
  var bound = 'bound'
  var property = Object.defineProperty

  property(Object.prototype, bound, {
    configurable: true,
    get: function () {
      var cache = {}
      var proxy = new Proxy(this, {
        get: function (self, name) {
          if (bound === name) {
            cache = {}
            return proxy
          } else {
            return cache[name] || (cache[name] = self[name].bind(self))
          }
        }
      })

      property(this, bound, {
        configurable: true,
        value: proxy
      })

      return proxy
    }
  })

})()
