import myCurrentLocation, { message, name, getGreeting } from "./myModule";
import subtract, { add } from "./math";

console.log(message);
console.log(myCurrentLocation);

console.log(getGreeting(name));

console.log(add(1, 1));
console.log(subtract(1, 1));
