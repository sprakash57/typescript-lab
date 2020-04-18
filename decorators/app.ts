//A decorator in a function you apply to a class.
//it will be called when js will find the definiton of your constuctor not when that will be used
function Logger(constructor: Function) {
    console.log('logging...');
    console.log('Loger-->', constructor);
}

@Logger
class Person {
    private name = 'sunny';
    constructor() {
        console.log('Creating person object for ' + this.name);
    }
}

const sunny = new Person();
console.log(sunny)