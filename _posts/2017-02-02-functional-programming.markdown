---
layout: post
title:  "Project Functional Programming"
date:   2017-02-02 10:11:25 -0600
categories: functional project euler
---

Last week I started reading a book about Functional Programming by [Kyle Simpson](https://github.com/getify) called [Functional-Light JavaScript](https://github.com/getify/Functional-Light-JS). As of now, I'm half way through the book and no expert 'FPer', but I thought I would try out some of the things I'm learning on a [Project Euler](https://projecteuler.net/) problem.

Let's start from the very beginning:

{% highlight javascript %}
/* Problem 1

If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
Find the sum of all the multiples of 3 or 5 below 1000. */

function multiplesLessThan(multiplier) {
  return function lessThan(bound) {
    var multiples = [];
    var number = multiplier;

    while(number < bound) {
      multiples.push(number);
      number += multiplier;
    }
    return multiples;
  }
}

function filter(predicate) {
  return function filterArr(arr) {
    return arr.filter(predicate);
  }
}

function multipleOf(divisor) {
  return function test(number) {
    return number % divisor === 0;
  }
}

function not(testFn) {
  return function innerNot(x) {
    return !(testFn(x))
  };
}

function concatArrays(...arr) {
  return [].concat(...arr);
}

function addTwo(x,y) {
  return x + y;
}

function add(arr) {
  return arr.reduce(addTwo, 0);
}

var threesLessThan = multiplesLessThan(3);
var threes = threesLessThan(1000);
var fivesLessThan = multiplesLessThan(5);
var fives = fivesLessThan(1000);
var notThrees = not(multipleOf(3));
var filterNotThrees = filter(notThrees);
var fivesNotThrees = filterNotThrees(fives);

var threesAndFives = concatArrays(threes, fivesNotThrees);
var total = add(threesAndFives);

console.log(total);
{% endhighlight %}
