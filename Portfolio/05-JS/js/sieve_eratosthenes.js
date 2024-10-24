/*
    Sieve of Eratosthenes - The sieve of Eratosthenes is one of the most efficient ways
    to find all of the smaller primes (below 10 million or so).
*/

// TODO: Adjust this script so it can work with the sieve.html file.

var sieve = function (n) {
  "use strict";
  var array = [];
  var primes = [];
  var i,j;

    // Initialize the array with true values
    for (i = 2; i <= n; i++) {
        array[i] = true;
    }

    // Implement the sieve of Eratosthenes algorithm
    for (i = 2; i <= Math.sqrt(n); i++) {
        if (array[i] === true) {
            for (j = i * i; j <= n; j += i) {
                array[j] = false;
            }
        }
    }

    // Collect all prime numbers
    for (i = 2; i <=  n; i++) {
      if (array[i] === true) {
          primes.push(i);
      }
    }

  // TODO: Implement the sieve of eratosthenes algorithm to find all the prime numbers under the given number.
  return primes;
};

function displayPrimes() {
  var num = document.getElementById("num").value;
    var primes = sieve(parseInt(num, 10));
    document.getElementById("primes").innerText = primes.join(", ");
}

console.log(sieve(1000000));
