# object-bound
[![npm version](https://img.shields.io/npm/v/object-bound.svg)](https://www.npmjs.com/package/object-bound)
[![Build Status](https://img.shields.io/travis/vlazar/object-bound.svg)](https://travis-ci.org/vlazar/object-bound)
[![Code Climate](https://img.shields.io/codeclimate/github/vlazar/object-bound.svg)](https://codeclimate.com/github/vlazar/object-bound)
[![Test Coverage](https://img.shields.io/codeclimate/coverage/github/vlazar/object-bound.svg)](https://codeclimate.com/github/vlazar/object-bound/coverage)
[![devDependencies Status](https://img.shields.io/david/dev/vlazar/object-bound.svg)](https://david-dm.org/vlazar/object-bound#info=devDependencies)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

Bind functions to objects with pleasure and a [tiny overhead](https://jsperf.com/object-bound)

## Usage

**Let's bind and call suit()**

```javascript
var wow = { much: { dots: { so: { fancy: { very: {
  suit: function() {
    console.log(this.msg);
  },
  msg: 'Many compliments'
}}}}}};
```

**Function.prototype.bind**

```javascript
var bound = wow.much.dots.so.fancy.very.suit.bind(wow.much.dots.so.fancy.very);
bound(); // 'Many compliments'
```

**object-bound/function.js**

```javascript
// similar to Function.prototype.bind, binds additional arguments
var bound = wow.much.dots.so.fancy.very.bound('suit');
bound(); // 'Many compliments'
```

**object-bound/property.js**

```javascript
// binds function to object, can't bind additional arguments
var bound = wow.much.dots.so.fancy.very.bound.suit;
bound(); // 'Many compliments'

// the bound function is cached, no need to save the reference to it
bound === wow.much.dots.so.fancy.very.bound.suit; // true

// get new bound function with .bound.bound (it binds and caches again)
var newBound = wow.much.dots.so.fancy.very.bound.bound.suit;
newBound === bound; // false
newBound == wow.much.dots.so.fancy.very.bound.suit; // true

// caching simplifies working with event listeners
class Greeter {
  constructor(el) {
    this.el = el;
    this.msg = 'Hi!';
    this.on();
  }
  hi() {
    console.log(this.msg);
  }
  on() {
    // no need to store the reference to 'this.bound.hi' here
    this.el.addEventListener('click', this.bound.hi);
  }
  off() {
    // remove event listener using the same 'this.bound.hi'
    this.el.removeEventListener('click', this.bound.hi);
  }
}

// get 'Hi!' on each click on the element :)
var greeter = new Greeter(element);
// stop getting 'Hi!' on each click on the element
greeter.off();
```
