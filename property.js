/**
 * Object.prototype.bound property: Cached function to object binding.
 * Copyright (c) 2015 Vladislav Zarakovsky
 * MIT license https://github.com/vlazar/object-bound/blob/master/LICENSE
 */
(function () {
  var bound = 'bound'
  var property = Object.defineProperty

  property(Object.prototype, bound, {
    configurable: true,
    get: boundMethods
  })

  function boundMethods () {
    var self = this
    var cache = {}
    var method
    var name

    for (name in self) {
      if (typeof (method = self[name]) === 'function') {
        cache[name] = method.bind(self)
      }
    }

    property(self, bound, {
      configurable: true,
      value: cache
    })

    return property(cache, bound, {
      get: boundMethods.bind(self)
    })
  }

})()
