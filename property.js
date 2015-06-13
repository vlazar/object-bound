/**
 * Object.prototype.bound property: Cached function to object binding.
 * Copyright (c) 2015 Vladislav Zarakovsky
 * MIT license https://github.com/vlazar/object-bound/blob/master/LICENSE
 */
(function () {
  var defineProperty = Object.defineProperty

  defineProperty(Object.prototype, 'bound', {
    configurable: true,
    get: function() {
      return boundMethods(this)
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

    defineProperty(bounded, 'bound', {
      configurable: true,
      get: function() {
        return boundMethods(obj)
      }
    })

    defineProperty(obj, 'bound', {
      configurable: true,
      value: bounded
    })

    return bounded
  }

})()
