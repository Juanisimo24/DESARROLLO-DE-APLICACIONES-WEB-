// Obtén todos los botones con la clase "drum"
const drumButtons = document.querySelectorAll(".drum");

// Agrega un event listener a cada botón
drumButtons.forEach(button => {
  button.addEventListener("click", () => {
    const buttonInnerHTML = button.innerHTML;
    makeSound(buttonInnerHTML);
    buttonAnimation(buttonInnerHTML);
  });
});

// Escucha eventos de teclado
document.addEventListener("keypress", event => {
  makeSound(event.key);
  buttonAnimation(event.key);
});

// Función para reproducir el sonido según la tecla presionada
const makeSound = key => {
  const soundMap = {
    "w": "sounds/tom-1.mp3",
    "a": "sounds/tom-2.mp3",
    "s": "sounds/tom-3.mp3",
    "d": "sounds/tom-4.mp3",
    "j": "sounds/snare.mp3",
    "k": "sounds/crash.mp3",
    "l": "sounds/kick-bass.mp3"
  };

  const soundFile = soundMap[key];
  if (soundFile) {
    const audio = new Audio(soundFile);
    audio.play();
  } else {
    console.log(`No sound mapped for key: ${key}`);
  }
};

// Función para animar los botones
const buttonAnimation = currentKey => {
  const activeButton = document.querySelector(`.${currentKey}`);
  if (activeButton) {
    activeButton.classList.add("pressed");
    setTimeout(() => {
      activeButton.classList.remove("pressed");
    }, 100);
  }
};
