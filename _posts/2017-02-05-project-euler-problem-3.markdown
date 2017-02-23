---
layout: post
title:  "Project Euler (FP) - Problem 3"
date:   2017-02-05 12:01:04 -0600
categories: functional-programming project euler
---

## The Problem

The prime factors of 13195 are 5, 7, 13 and 29.

What is the largest prime factor of the number 600851475143?

## A Solution

I figured that when finding the factors of a number, testing the lower of the multiplicands eliminates any numbers larger than the number being tested divided by that multiplicand.

{% highlight javascript %}
function findFactors(number) {
  let x = 1;
  let y = number;
  let factors = []
  while(x <= y) {
    if(number % x === 0) {
      factors.push(x);
      if(x !== number/x) {
        factors.push(number/x);
      }
    }
    x++;
    y = number/x;
  }
  return factors.sort(compareNumbers);
}

// For sorting array of numbers in ascending order using Array.sort()
function compareNumbers(a, b) {
  return a - b;
}
{% endhighlight %}

After finding the multiples of a number, the test for prime is simple.

{% highlight javascript %}
function isPrime(number) {
  return findFactors(number).length === 2;
}
{% endhighlight %}


I lifted this compose function from Kyle Simpson's wonderful book: [Functional-Light JS](https://github.com/getify/Functional-Light-JS/blob/master/ch4.md). The compose function makes it so that one function's output becomes the input to the next function. 

{% highlight javascript %}
function compose(...fns) {
  return function composed(result){
    // copy the array of functions
    var list = fns.slice();

    while (list.length > 0) {
      // take the last function off the end of the list
      // and execute it
      result = list.pop()( result );
    }

    return result;
  };
}
{% endhighlight %}

To complete the task we just need a function to take in an array and return the value at the last index.

{% highlight javascript %}
function last(arr) {
  return arr[arr.length - 1];
}

var testNum = 600851475143;

var filterPrimes = filter(isPrime);
{% endhighlight %}

`compose` makes possible a very compact, readable, almost self-explanatory bit of code:

{% highlight javascript %}
var largestPrimeFactor = compose(last, filterPrimes, findFactors);

largestPrimeFactor(testNum); // 6857
{% endhighlight %}

## Conclusion

I thought up that method of finding multiples after Luke Schlangen (a prof. at [Prime Academy](https://primeacademy.io)) taught us a way to search an array of sorted numbers for two numbers that produced a given sum by starting with the first index and the last index:

{% highlight javascript %}
function sumTwoInArray(arr, sum) {
  let x = 0;
  let y = arr.length - 1;
  let returnValue = false;
  let addTwo;
  while(x < y && !returnValue) {
    addTwo = arr[x] + arr[y];
    if(addTwo === sum) {
      returnValue = true;
    } else if(addTwo > sum) {
      y--;
    } else {
      x++;
    }
  }
  return returnValue;
}
{% endhighlight %}

The `compose` function is such a great feature of the functional programming paradigm, but it only works with functions that take one parameter. Functional programming has ways of dealing with that. Hopefully, I'll find a problem where I can practice that soon.

