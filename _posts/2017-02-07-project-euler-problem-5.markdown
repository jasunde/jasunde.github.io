---
layout: post
title:  "Project Euler - Problem 5"
date:   2017-02-07 10:50:11 -0600
categories: functional-programming project euler
---

## The Problem

2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.

What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?

## A Solution

11-20 contain the multiples 1-10 so we only need to test for the former range.

{% highlight javascript %}
20 = [1, 2, 4, 5, 10]
19 = [1, 19]
18 = [1, 2, 3, 6, 9]
17 = [1, 17]
16 = [1, 2, 4, 8]
15 = [1, 3, 5]
14 = [1, 2, 7]
13 = [1, 13]
12 = [1, 2, 6, 12]
11 = [1, 11]
{% endhighlight %}

Here is a function that returns true if all of an array of tests return true.

{% highlight javascript %}
// takes a list of predicates
// returns true if a given argument passes all tests
function all(val, ...predicates) {
  return predicates.every(function test(predicate) {
    return predicate(val);
  });
}
{% endhighlight %}

With `all(..)` we have the opportunity to partially apply arguments to yield a function that takes one argument rather than many. Earlier `partial(..)` applied arguments to the left of the list, but `all(..)` wants arguments to the right so here's an implementation of how to do that.

{% highlight javascript %}
// Again from Kyle Simpson
// https://github.com/getify/Functional-Light-JS/blob/master/ch3.md#reversing-arguments
function reverseArgs(fn) {
  return function argsReversed(...args) {
    return fn(...args.reverse());
  };
}

// Again from Kyle Simpson
function partialRight(fn, ...presetArgs) {
  return reverseArgs(
    partial( reverseArgs(fn), ...presetArgs.reverse())
  );
}
{% endhighlight %}

To reduce the number of tests that need to run I decided to make the step of the while loop equal to the product of the largest two numbers tested. I'm sure some more tests could be logically eliminated, but I'm not sure how to prove that.

{% highlight javascript %}
function smallestMultipleOf(multipleNums) {
  let allMultiples = partialRight(all, ...map(multipleOf, multipleNums));

  let length = multipleNums.length;
  let multiple = multipleNums[length - 1] * multipleNums[length - 2];

  let number = multiple;

  while(true) {
    if(allMultiples(number)) {
      return number;
    }
    number += multiple;
  }
}

var multipleNums = [11,12,13,14,15,16,17,18,19,20];

smallestMultipleOf(multipleNums);
{% endhighlight %}

## Conclusion

It's nice to be able to reuse more work than normal, but `smallestMultipleOf(..)` demonstrates that having more specific solutions can cut down on the computational expense of a solution.

