# object-bound
[![npm version](https://img.shields.io/npm/v/object-bound.svg)](https://www.npmjs.com/package/object-bound)
[![Build Status](https://img.shields.io/travis/vlazar/object-bound.svg)](https://travis-ci.org/vlazar/object-bound)
[![Code Climate](https://img.shields.io/codeclimate/github/vlazar/object-bound.svg)](https://codeclimate.com/github/vlazar/object-bound)
[![Test Coverage](https://img.shields.io/codeclimate/coverage/github/vlazar/object-bound.svg)](https://codeclimate.com/github/vlazar/object-bound/coverage)
[![devDependencies Status](https://img.shields.io/david/dev/vlazar/object-bound.svg)](https://david-dm.org/vlazar/object-bound#info=devDependencies)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

Convenient replacement for Function.prototype.bind

## TL;DR

**Replace this**

```javascript
wow.much.dots.so.fancy.very.suit.bind(wow.much.dots.so.fancy.very);
wow.much.dots.so.fancy.very.suit.bind(wow.much.dots.so.fancy.very, '!');
var cached = wow.much.dots.so.fancy.very.suit.bind(wow.much.dots.so.fancy.very);
```

**With this**

```javascript
wow.much.dots.so.fancy.very.bound('suit');
wow.much.dots.so.fancy.very.bound('suit', '!');
wow.much.dots.so.fancy.very.bound.suit;
```

## Usage

### Binding

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

```javascript
var boundSuit = wow.much.dots.so.fancy.very.suit.bind(wow.much.dots.so.fancy.very, '!');
boundSuit(); // 'Many compliments!'
```

**[object-bound/function.js](function.js)**

Has all Function.prototype.bind features and a nicer syntax.

```javascript
var boundSuit = wow.much.dots.so.fancy.very.bound('suit', '!');
boundSuit(); // 'Many compliments!'
```

**[object-bound/property.js](property.js)**

Cached function binding. Clears cache on demand. No arguments binding.

```javascript
var boundSuit = wow.much.dots.so.fancy.very.bound.suit;
boundSuit('!'); // 'Many compliments!'
```

**[object-bound/proxy.js](proxy.js)**

NOTE: Depends on [ES6 Proxy](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Proxy), but works for non enumerable functions, unlike [object-bound/property.js](property.js).

Cached function binding. Clears cache on demand. No arguments binding.

```javascript
var boundSuit = wow.much.dots.so.fancy.very.bound.suit;
boundSuit('!'); // 'Many compliments!'
```

### Caching

Both [property.js](property.js) and [proxy.js](proxy.js) cache bound functions and can clear cache on demand.

With caching there is no need to store a reference to the bound function anymore.

```javascript
var boundSuit1 = wow.much.dots.so.fancy.very.bound.suit;
var boundSuit2 = wow.much.dots.so.fancy.very.bound.suit;

// references the same function, always using .bound.suit gives the same result
boundSuit1 === boundSuit2; // true
```

### Clear cache

Use ```.bound.bound``` to get the new cached bound function.

```javascript
var oldSuit = wow.much.dots.so.fancy.very.bound.suit;

// .bound.bound clears the cache and returns new bound function
var newSuite = wow.much.dots.so.fancy.very.bound.bound.suit;
oldSuit === boundSuit; // false

// references the same function again
newSuite === wow.much.dots.so.fancy.very.bound.suit; // true
```

### Typical property/proxy use case

Cached bound functions simplify working with event listeners.

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
