/*
Pig Latin
*/

/*Pig Latin*/
function translateToPigLatin() {
  var str = document.getElementById("txtVal").value;
  var returnArray = [];
  var wordArray = str.split(' ');

  for (var i = 0; i < wordArray.length; i++) {
      var word = wordArray[i];
      var beginning = word.charAt(0);
      if (/[aeiouAEIOU]/.test(beginning)) {
          returnArray.push(word + 'way');
      } else {
          var vowelIndex = -1;
          for (var ii = 1; ii < word.length; ii++) {
              if (/[aeiouAEIOU]/.test(word.charAt(ii))) {
                  vowelIndex = ii;
                  break;
              }
          }
          if (vowelIndex !== -1) {
              returnArray.push(word.slice(vowelIndex) + word.slice(0, vowelIndex) + 'ay');
          } else {
              returnArray.push(word + 'ay');
          }
      }
  }
  document.getElementById("pigLatLbl").innerText = returnArray.join(" ");
}

// Some examples of expected outputs
console.log(translateToPigLatin("pizza")); // "izzapay"
console.log(translateToPigLatin("apple")); // "appleway"
console.log(translateToPigLatin("happy meal")); // "appyhay ealmay"
