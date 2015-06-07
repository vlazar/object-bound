# object-bound
[![npm version](https://img.shields.io/npm/v/object-bound.svg)](https://www.npmjs.com/package/object-bound)
[![Build Status](https://img.shields.io/travis/vlazar/object-bound.svg)](https://travis-ci.org/vlazar/object-bound)
[![Code Climate](https://img.shields.io/codeclimate/github/vlazar/object-bound.svg)](https://codeclimate.com/github/vlazar/object-bound)
[![Test Coverage](https://img.shields.io/codeclimate/coverage/github/vlazar/object-bound.svg)](https://codeclimate.com/github/vlazar/object-bound/coverage)

Object.prototype.bound

> The opposite side of Function.prototype.bind

As fast as possible: [70-90% speed of Function.prototype.bind](https://jsperf.com/object-bound)

## Usage

```javascript
var wow = { much: { dots: { so: { fancy: { very: {
  suit: function() {
    console.log(this.msg);
  },
  msg: 'Many compliments'
}}}}}};

// Function.prototype.bind:
var bound = wow.much.dots.so.fancy.very.suit.bind(wow.much.dots.so.fancy.very);
bound(); // 'Many compliments'

// Object.prototype.bound:
var bound = wow.much.dots.so.fancy.very.bound('suit');
bound(); // 'Many compliments'
```
