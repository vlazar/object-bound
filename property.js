/**
 * Object.prototype.bound property: Cached function to object binding.
 * Copyright (c) 2015 Vladislav Zarakovsky
 * MIT license https://github.com/vlazar/object-bound/blob/master/LICENSE
 */
(function () {
  var defineProperty = Object.defineProperty,
    name = 'bound'

  defineProperty(Object.prototype, name, {
    configurable: true,
    get: boundMethods
  })

  function boundMethods () {
    var self = this,
      bound = {},
      method

    for (var key in self) {
      method = self[key]
      if (typeof method === 'function') {
        bound[key] = method.bind(self)
      }
    }

    defineProperty(bound, name, {
      get: boundMethods.bind(self)
    })

    defineProperty(self, name, {
      configurable: true,
      value: bound
    })

    return bound
  }

})()
