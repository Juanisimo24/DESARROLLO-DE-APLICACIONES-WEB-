// Función para generar un número aleatorio entre 1 y 6 y devolver la ruta de la imagen correspondiente
function getRandomImageSource() {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    return `images/dice${randomNumber}.png`;
  }
  
  // Asignar las imágenes a los dados
  document.querySelectorAll("img")[0].setAttribute("src", getRandomImageSource());
  document.querySelectorAll("img")[1].setAttribute("src", getRandomImageSource());
  
  // Comparar los números de los dados y mostrar el resultado
  const randomNumber1 = parseInt(document.querySelectorAll("img")[0].getAttribute("src").slice(-5, -4));
  const randomNumber2 = parseInt(document.querySelectorAll("img")[1].getAttribute("src").slice(-5, -4));
  
  let resultMessage;
  if (randomNumber1 > randomNumber2) {
    resultMessage = "✨ Player 1 Wins! ✨";
  } else if (randomNumber2 > randomNumber1) {
    resultMessage = "✨ Player 2 Wins! ✨";
  } else {
    resultMessage = "Draw!";
  }
  
  document.querySelector("h1").innerHTML = resultMessage;
  