/**
 * Object.prototype.bound property: Cached function to object binding.
 * Copyright (c) 2015 Vladislav Zarakovsky
 * MIT license https://github.com/vlazar/object-bound/blob/master/LICENSE
 */
(function () {
  var defineProperty = Object.defineProperty

  defineProperty(Object.prototype, 'bound', {
    configurable: true,
    enumerable: false,
    get: function () {
      var self = this,
        bounded = boundMethods(self)

      defineProperty(bounded, 'bound', {
        configurable: true,
        enumerable: false,
        get: function () {
          return boundMethods(self)
        }
      })

      return bounded
    }
  })

  function boundMethods (obj) {
    var bounded = {}, method

    for (var key in obj) {
      method = obj[key]
      if (typeof method === 'function') {
        bounded[key] = method.bind(obj)
      }
    }

    defineProperty(obj, 'bound', {
      configurable: true,
      enumerable: false,
      value: bounded
    })

    return bounded
  }

})()
