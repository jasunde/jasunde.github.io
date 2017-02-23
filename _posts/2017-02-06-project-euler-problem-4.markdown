---
layout: post
title:  "Project Euler (FP) - Problem 4"
date:   2017-02-06 18:01:41 -0600
categories: functional-programming project euler
---

## The Problem

A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.

Find the largest palindrome made from the product of two 3-digit numbers.

## A Solution

It seems the simplest way to find a palindrome is to compare the number against its reverse. I thought about making `reverse` accomodate more data types, but decided to wait for that requirement.

{% highlight javascript %}
// reverse an integer
function reverse(val) {
  let type = typeof val;
  
  // Convert to array
  let array = val.toString().split('');

  // Reverse array
  let x = 0;
  let y = array.length - 1;
  let temp;
  while(x < y) {
    temp = array[x];
    array[x] = array[y];
    array[y] = temp
    x++;
    y--;
  }

  // Convert to integer
  return parseInt(array.join(''));
}
{% endhighlight %}

`reverse` makes finding a palindrome trivial.

{% highlight javascript %}
function isPalindrome(number) {
  return number === reverse(number);
}
{% endhighlight %}

Mulling over the rest of the problem on a walk today, I realized I could start from the largest numbers and test the size of the product of the numbers against the size of the largest palindrome so as not to go over the entire collection of possibilities.

{% highlight javascript %}
// Returns largestest palindrome that is the product two integers <= a given integer
function largestPalindromeProduct(int) {
  let x = int;
  let y = int;
  let largestPalindrome = 0;
  let product;
  while(x > 0) {
    product = x * y;
    y--;
    if(product < largestPalindrome) {
      x--;
      y = x;
      if(x * x < largestPalindrome) {
        return largestPalindrome;
      }
    } else {
      if(isPalindrome(product)) {
        largestPalindrome = product;
        x--;
        y = x;
      }
    }
  }
}
{% endhighlight %}

## Conclusion

Not many aspects of functional programming in this solution. I should probably think of it as a tool in the toolbox rather than a universal panacea.

