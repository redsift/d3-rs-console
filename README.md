# d3-rs-console

`d3-rs-console` is a component for creating animateable terminal frame in a SVG container.

## Builds

[![Circle CI](https://circleci.com/gh/Redsift/d3-rs-console.svg?style=svg)](https://circleci.com/gh/Redsift/d3-rs-console)

## Example

[View @redsift/d3-rs-console on Codepen](https://codepen.io/rahulpowar/pen/pyOjoX/)

## Usage

### Browser
	
	<script src="//static.redsift.io/reusable/d3-rs-console/latest/d3-rs-console.umd-es2015.min.js"></script>
	<script>
		var text = d3_rs_console.svg();
		...
	</script>

### ES6

	import { text } from "@redsift/d3-rs-console";
	let eml = text.svg();
	...
	
### Require

	var text = require("@redsift/d3-rs-console");
	var eml = text.svg();
	...

### Parameters

|Name|Description|Transition|
|----|-----------|----------|
|classed|SVG custom class|N|
|x,y,width,height|px values|Y|
|appearance|theme|N|
