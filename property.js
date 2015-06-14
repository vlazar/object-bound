/**
 * Object.prototype.bound property: Cached function to object binding.
 * Copyright (c) 2015 Vladislav Zarakovsky
 * MIT license https://github.com/vlazar/object-bound/blob/master/LICENSE
 */
(function () {
  var defineProperty = Object.defineProperty,
    bound = 'bound'

  defineProperty(Object.prototype, bound, {
    configurable: true,
    get: boundMethods
  })

  function boundMethods () {
    var self = this,
      cache = {},
      method

    for (var name in self) {
      if (typeof (method = self[name]) === 'function') {
        cache[name] = method.bind(self)
      }
    }

    defineProperty(cache, bound, {
      get: boundMethods.bind(self)
    })

    defineProperty(self, bound, {
      configurable: true,
      value: cache
    })

    return cache
  }

})()
