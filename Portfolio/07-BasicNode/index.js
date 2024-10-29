console.log("Hello, world!");
// test.js
import {randomSuperhero} from 'superheroes';
import {randomSupervillain} from 'supervillains';
import { readFileSync } from "fs";
import sw from 'star-wars-quotes';

console.log(randomSuperhero()); // Esto debería mostrar todos los héroes disponibles
console.log(randomSupervillain()); // Esto debería mostrar todos los supervillanos disponibles
console.log(sw());
console.log(`${randomSuperhero()} will battle ${randomSupervillain()}!`);

var FileSync= readFileSync("./data/input.txt", "utf8");
console.log (FileSync);