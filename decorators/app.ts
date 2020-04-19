/* ---> 1. class Decorator*/
//it will be called when js will find the definiton of your constuctor not when that will be used
function Logger(msg: string) {
    return function (constructor: Function) {
        console.log('LOGGER FUNCTION MESSAGE ' + msg);
    }
}

function WithTemplate(template: string, id: string) {
    return function (constructor: any) {
        const p = new constructor();
        const rootEl = document.getElementById(id);
        if (rootEl) rootEl.innerHTML = `<h1>${template} for ${p.name}</h1>`;
    }
}

@Logger('LOGGING - PERSON')
@WithTemplate('Person Object', 'root')
class Person {
    private name = 'sunny';
    constructor() {
        console.log('Creating person object for ' + this.name);
    }
}

/* ---> 2. Property Decorator*/
/* ---> 3. Accessor Decorator*/
/* ---> 4. Method Decorator*/
/* ---> 5. Parameter Decorator -> It wont work for accesors*/
function LogProps(target: any, propName: string | Symbol) {
    console.log(target, propName);
}

function LogAccessors(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function LogMethod(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function LogParams(target: any, name: string | Symbol, position: number) {
    console.log(target);
    console.log(name);
    console.log(position);
}

class Product {
    @LogProps//it runs when class is registered with javaScript not when instance of class will be created
    private _title: string;
    private _price: number
    constructor(t: string, p: number) {
        this._title = t;
        this._price = p;
    }
    @LogMethod
    getPiceWithTax(@LogParams tax: number) {
        return this._price + tax;
    }
    @LogAccessors
    get title() {
        return this._title
    }

    set price(value: number) {
        if (value > 0) this._price = value
        else throw new Error('Price should be greater than 0');
    }
}

/* ---> 6. Modify descriptor of methods*/

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const boundMethod = descriptor.value;
    const newDescription: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            return boundMethod.bind(this);
        }
    }
    return newDescription;
}

class Printer {
    private msg = 'this works'

    @Autobind
    print() {
        console.log(this.msg);
    }
}

const p = new Printer();

const btn = document.querySelector('button')!;
btn.addEventListener('click', p.print)
