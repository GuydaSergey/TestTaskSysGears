
jakes-gordon-growing-packer
==================

[![version](https://img.shields.io/badge/version-0.1.0-blue.svg)](https://github.com/AlexisTessier/jakes-gordon-growing-packer#readme)
[![npm version](https://badge.fury.io/js/jakes-gordon-growing-packer.svg)](https://badge.fury.io/js/jakes-gordon-growing-packer)

[![Dependency Status](https://david-dm.org/AlexisTessier/jakes-gordon-growing-packer.svg)](https://david-dm.org/AlexisTessier/jakes-gordon-growing-packer)
[![devDependency Status](https://david-dm.org/AlexisTessier/jakes-gordon-growing-packer/dev-status.svg)](https://david-dm.org/AlexisTessier/jakes-gordon-growing-packer#info=devDependencies)

[Home Page](https://github.com/AlexisTessier/jakes-gordon-growing-packer#readme)

A javascript binary tree based algorithm for 2d bin-packing

Purpose
-------

+ Creating a spritesheet generator

Install
-------

```
npm install jakes-gordon-growing-packer
```

How to use
----------

[See first the Original algorithm README](https://github.com/jakesgordon/bin-packing#readme)

```javascript

var GrowingPacker = require('jakes-gordon-growing-packer')

var packer = new GrowingPacker({
	//sortMethod: a sort method or a valid sort method name, default to maxside

	blocks: [
		{ w: 100, h: 100 },
		{ w: 100, h: 100 },
		{ w:  80, h:  80 },
		{ w:  80, h:  80 }
	]
	/* blocks is optional and can be passed directly to the pack method */
});

var pack = packer.pack();

// or

var packer = new GrowingPacker();
var pack = packer.pack([
	{ w: 100, h: 100 },
	{ w: 100, h: 100 },
	{ w:  80, h:  80 },
	{ w:  80, h:  80 }
]);

// then

console.log(pack.width, pack.height);

var rectangles = pack.rectangles(); //note that the rectangles method modify your original blocks array
	
for(var i = 0, imax = rectangles.length ; i < imax ; i++) {
	var rect = rectangles[i];

	//do something like :
	//DrawRectangle(rect.x, rect.y, rect.w, rect.h);
}

```

Valid sort methods
------------------

+ random

	```javascript
	function random(a, b) {
		return Math.random() - 0.5;
	}
	```
+ w

	```javascript
	function w(a, b) {
		return b.w - a.w;
	}
	```
+ h

	```javascript
	function h(a, b) {
		return b.h - a.h;
	}
	```
+ a

	```javascript
	function a(_a, b) {
		return b.area - _a.area;
	}
	```
+ max

	```javascript
	function max(a, b) {
		return Math.max(b.w, b.h) - Math.max(a.w, a.h);
	}
	```
+ min

	```javascript
	function min(a, b) {
		return Math.min(b.w, b.h) - Math.min(a.w, a.h);
	}
	```
+ height

	```javascript
	function height(a, b) {
		return msort(a, b, ['h', 'w']);
	}
	```
+ width

	```javascript
	function width(a, b) {
		return msort(a, b, ['w', 'h']);
	}
	```
+ area

	```javascript
	function area(a, b) {
		return msort(a, b, ['a', 'h', 'w']);
	}
	```
+ maxside

	```javascript
	function maxside(a, b) {
		return msort(a, b, ['max', 'min', 'h', 'w']);
	}
	```

Credits
-------

The packing algorithm is from [here](https://github.com/jakesgordon/bin-packing)

I just wrap it in a custom API (including the sort methods proposed by [Jake Gordon](https://github.com/jakesgordon) ) and make it accesible via npm since [that issue](https://github.com/jakesgordon/bin-packing/issues/1) is still opened.
