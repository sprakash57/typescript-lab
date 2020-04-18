var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//A decorator in a function you apply to a class.
//it will be called when js will find the definiton of your constuctor not when that will be used
function Logger(constructor) {
    console.log('logging...');
    console.log('Loger-->', constructor);
}
let Person = class Person {
    constructor() {
        this.name = 'sunny';
        console.log('Creating person object for ' + this.name);
    }
};
Person = __decorate([
    Logger
], Person);
const sunny = new Person();
console.log(sunny);
