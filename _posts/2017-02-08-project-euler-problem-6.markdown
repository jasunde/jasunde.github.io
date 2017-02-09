---
layout: post
title:  "Project Euler - Problem 6"
date:   2017-02-08 17:18:55 -0600
categories: functional-programming project euler
---

## The Problem

The sum of the squares of the first ten natural numbers is, `12 + 22 + ... + 102 = 385`

The square of the sum of the first ten natural numbers is, `(1 + 2 + ... + 10)2 = 552 = 3025`

Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is `3025 − 385 = 2640`.

Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.

## A Solution

[Plunker with some unit tests.](http://embed.plnkr.co/aAXK1UV9OMD8tsUOIzvu/)

Here's the compose function introduced in [problem 3]({% link _posts/2017-02-05-project-euler-problem-3.markdown %}) that sends the output of each function to the input of the next function. The difference is that this time it's implemented with the `reduceRight(..)` array method making it capable of accepting more than one argument for the first function in the composition.

{% highlight javascript %}
// Again from Kyle Simpson
// https://github.com/getify/Functional-Light-JS/blob/master/ch4.md#general-composition
function compose(...fns) {
  return fns.reduceRight(function reducer(fn1, fn2) {
    return function composed(...args) {
      return fn2(fn1(...args));
    };
  });
}
{% endhighlight %}

This function called curry which deals with partially applying arguments to functions like in [problem 5](_posts/2017-02-07-project-euler-problem-5.markdown). I guess is the first I've addressed the idea of arity in this blog. Arity is a fancy word for the number of arguments that a function takes. You can find the arity of a function `fn` through its length property `fn.length`  Partially applying arguments to functions can be very useful if you know part of the info but not all of it at any point in your code. In addition the `compose` function relies on all of the functions being unary, that is having an arity of one.

{% highlight javascript %}
// https://github.com/getify/Functional-Light-JS/blob/master/ch3.md#one-at-a-time
function curry(fn, arity = fn.length) {
  return (function nextCurried(prevArgs) {
    return function curried(...nextArgs) {
      var args = prevArgs.concat( nextArgs );

      if(args.length >= arity) {
        return fn( ...args );
      } else {
        return nextCurried( args );
      }
    }
  })( [] );
}
{% endhighlight %}

This `unboundMethod` is a tricksy way of 'unbinding' a method from an object. In essence, it makes a function that takes the object as an argument but then uses that argument's method in the end. In this case I wanted to use the native array methods `reduce` and `map` in that way. The second argument is the arity of the method which the curry method can not know without us providing it.

{% highlight javascript %}
// https://github.com/getify/Functional-Light-JS/blob/master/ch3.md#one-at-a-time
function unboundMethod(methodName, argCount = 2) {
  return curry(
    function(...args) {
      var obj = args.pop();
      return obj[methodName](...args)
    },
    argCount
  );
}

var reduce = unboundMethod('reduce', 3);
var map = unboundMethod('map', 2);
{% endhighlight %}

Here's a little helper function to create an array of natural numbers within certain bounds.

{% highlight javascript %}
function range(min, max) {
  let x = min;
  let arr = []
  while (x <= max) {
    arr.push(x++);
  }
  return arr
}
{% endhighlight %}

So here's the payoff. The preceding functions are tough to read at first, but they are all very testable utilities that support concise and readable code below. Indeed, there are libraries like [Ramda](http://ramdajs.com/) that implement those utilities.

{% highlight javascript %}
var square = x => x * x;
var sum = (x,y) => x + y;

var sumOfSquares = compose( reduce( sum, 0 ), map( square ) );
var squareOfSum = compose( square, reduce( sum, 0 ));

var theRange = range(1, 100);

var sumSquareDifference = function (range) {
  return squareOfSum(range) - sumOfSquares(range);
}
{% endhighlight %}

## Conclusion

`compose` can make a concise, readable function pipeline.

`curry` can deal with arity to create unary functions that are composable.

`unboundMethod` is a fun way of turning a method into a standalone function.

