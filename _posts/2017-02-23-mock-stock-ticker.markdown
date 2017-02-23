---
layout: post
title:  "Mock Stock Ticker"
date:   2017-02-23 11:56:00 -0600
categories: functional-programming 
---

# Mock Stock Ticker

Link to [Mock Stock Ticker]({{ site.baseurl }}{% link /demos/mock-stock-ticker/src/index.html %})
## Functional Programming Intro
I got my first introduction to Functional Programming (FP) recently and learned of [Kyle Simpson's](https://github.com/getify) wonderful book [Functional-Light JS](https://github.com/getify/Functional-Light-JS). I thoroughly enjoyed the book not least because of his pragmatic approach to learning FP:

> The better I am at writing in a clear, consistent voice, the better this book experience will be for you. But I'm not a 100% perfect author. Some parts will be better written than others. The parts where I can still improve are not going to invalidate the other parts of this book which are useful.

> And so it goes with our code. The more you can apply these principles to more parts of your code, the better your code will be. Use them well 25% of the time, and you'll get some good benefit. Use them 80% of the time, and you'll see even more benefit.

I look forward to the impact that FP ideas will have on the quality and readability of my coding. And though it may not happen right away, I would love to get more academic about studying FP because it's just so exciting!

## The Project
The core of this is taken from an exercise at the end of [Functional-Light JS](https://github.com/getify/Functional-Light-JS) to build a mock stock ticker using the FP ideas introduced in the book which are manifold: partial application of arguments, currying, composing, piping, mapping, filtering, reducing, and more.

The addition I've made is to visualize the stock prices progressively using [D3.js](https://d3js.org/).

## A few tests
No full test coverage here, but I added some tests in jasmine visible at `SpecRunner.html` for personal practice and to help me reason through some of the code in the core of the project.

- [Spec Runner]({{ site.baseurl }} {% link /demos/mock-stock-ticker/SpecRunner.html %})
- [The Specs](https://github.com/jasunde/mock-stock-ticker/tree/master/spec)

