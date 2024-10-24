/*
    Fibonacci Sequence - Enter a number and have the program
    generate the Fibonacci sequence to that number or to the Nth number.
*/
// This array will keep memory of the previous fibonacci numbers
var memo = {};
function fibonacci() {
  "use strict";
  var n = parseInt(document.getElementById("num").value);
  var val = f(n);
  console.log(val); // Mostramos el valor en la consola para ver el resultado
  return val;
}

function f(n) {
  var value;
  // Check if the memory array already contains the requested number
  if (memo.hasOwnProperty(n)) {
    value = memo[n];
  } else {
    //TODO: Implement the fibonacci function here!

    // Base cases: Fibonacci(0) = 0, Fibonacci(1) = 1
    if (n <= 1) {
      value = n;
    } else {
      // Recursive case: Fibonacci(n) = Fibonacci(n-1) + Fibonacci(n-2)
      value = f(n - 1) + f(n - 2);
    }

    memo[n] = value;
  }

  return value;
}
// Display the Fibonacci result
document.getElementById("btn").addEventListener("click", function() {
  var result = fibonacci();  // Calcula Fibonacci
  document.getElementById("fibonacciLbl").innerText = "Fibonacci: " + result;  // Muestra el resultado
});
