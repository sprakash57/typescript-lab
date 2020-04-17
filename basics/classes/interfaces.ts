interface Named {
    readonly name: string
    readonly salute?: string//optional property
}

interface Greetable extends Named {
    greet(phrase: string): void;
}

class Person implements Greetable {
    constructor(public name: string) { }
    greet(p: string) {
        console.log(p + ' ' + this.name);
    }
}

let user1 = new Person('Sunny');
user1.greet('good morning');

//Interfaces as a function
interface Addfn {
    (a: number, b: number, m?: number): number;
}

let add: Addfn;
add = (a: number, b: number) => a + b
