# object-bound
[![npm version](https://img.shields.io/npm/v/object-bound.svg)](https://www.npmjs.com/package/object-bound)
[![Build Status](https://img.shields.io/travis/vlazar/object-bound.svg)](https://travis-ci.org/vlazar/object-bound)
[![Code Climate](https://img.shields.io/codeclimate/github/vlazar/object-bound.svg)](https://codeclimate.com/github/vlazar/object-bound)
[![Test Coverage](https://img.shields.io/codeclimate/coverage/github/vlazar/object-bound.svg)](https://codeclimate.com/github/vlazar/object-bound/coverage)
[![devDependencies Status](https://img.shields.io/david/dev/vlazar/object-bound.svg)](https://david-dm.org/vlazar/object-bound#info=devDependencies)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

Bind functions to objects with pleasure.

## Usage

### Basic

**Let's make a bound suit()**

```javascript
var wow = { much: { dots: { so: { fancy: { very: {
  suit: function(suffix) {
    console.log(this.msg + (suffix || ''));
  },
  msg: 'Many compliments'
}}}}}};
```

**To print the following**

```javascript
'Many compliments!'
```

**Function.prototype.bind**

Old-fashioned way. Ugly, especially with nested objects.

```javascript
var boundSuit = wow.much.dots.so.fancy.very.suit.bind(wow.much.dots.so.fancy.very, '!');
boundSuit(); // 'Many compliments!'
```

**[object-bound/function.js](function.js)**

Has all Function.prototype.bind features. Binds additional arguments.

```javascript
var boundSuit = wow.much.dots.so.fancy.very.bound('suit', '!');
boundSuit(); // 'Many compliments!'
```

**[object-bound/property.js](property.js)**

Cached function to object binding. Clears cache on demand.

```javascript
var boundSuit = wow.much.dots.so.fancy.very.bound.suit;
boundSuit('!'); // 'Many compliments!'
```

**[object-bound/proxy.js](proxy.js)**

NOTE: [Needs ES6 Proxy to work](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

Cached function to object binding. Clears cache on demand. Works with non enumerable methods on native objects.

```javascript
var boundSuit = wow.much.dots.so.fancy.very.bound.suit;
boundSuit('!'); // 'Many compliments!'
```

### Caching

Both [property.js](property.js) and [proxy.js](proxy.js) cache bound functions. It's convenient and very fast way to access object methods.

* ```.bound``` property binds and caches all functions on the same level at once
* ```.bound``` proxy binds and caches functions one by one on demand

There is no need to store a reference to the bound function.

```javascript
var boundSuit1 = wow.much.dots.so.fancy.very.bound.suit;
var boundSuit2 = wow.much.dots.so.fancy.very.bound.suit;

// references the same function, always using .bound.suit gives the same result
boundSuit1 === boundSuit2; // true
```

Use ```.bound.bound``` to get the new cached bound function.

```javascript
var oldSuit = wow.much.dots.so.fancy.very.bound.suit;

// to clear the cache use .bound.bound (it returns new bound method)
var newSuite = wow.much.dots.so.fancy.very.bound.bound.suit;
oldSuit === boundSuit; // false

// references the same function again
newSuite === wow.much.dots.so.fancy.very.bound.suit; // true
```

###Typical property/proxy use case

Cached property/proxy simplifies working with event listeners.

```javascript
class Greeter {
  constructor(el) {
    this.el = el;
    this.msg = 'Hi!';
    // no need to store the reference to 'this.bound.hi' somewhere
    this.el.addEventListener('click', this.bound.hi);
  }
  off() {
    // remove event listener using the same 'this.bound.hi'
    this.el.removeEventListener('click', this.bound.hi);
  }
  hi() {
    console.log(this.msg);
  }
}

// get 'Hi!' on each click on the element :)
var greeter = new Greeter(element);

// stop getting 'Hi!' on each click on the element
greeter.off();
```
