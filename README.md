# object-bound
[![npm version](https://img.shields.io/npm/v/object-bound.svg)](https://www.npmjs.com/package/object-bound)
[![Build Status](https://img.shields.io/travis/vlazar/object-bound.svg)](https://travis-ci.org/vlazar/object-bound)
[![Code Climate](https://img.shields.io/codeclimate/github/vlazar/object-bound.svg)](https://codeclimate.com/github/vlazar/object-bound)
[![Test Coverage](https://img.shields.io/codeclimate/coverage/github/vlazar/object-bound.svg)](https://codeclimate.com/github/vlazar/object-bound/coverage)

Bind functions to objects with pleasure and a [tiny overhead](https://jsperf.com/object-bound)

## Usage

**Let's bind and call suit() from this object**

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
// gives all Function.prototype.bind features
var bound = wow.much.dots.so.fancy.very.bound('suit');
bound(); // 'Many compliments'
```

**object-bound/property.js**

```javascript
// gives binding to object only, can't bind additional arguments
var bound = wow.much.dots.so.fancy.very.bound.suit;
bound(); // 'Many compliments'

// bonus feature: it caches binding (e.g. bind/unbind event handlers easily)
bound === wow.much.dots.so.fancy.very.bound.suit; // true
```
