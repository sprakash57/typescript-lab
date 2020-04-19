"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/* ---> 1. class Decorator*/
//it will be called when js will find the definiton of your constuctor not when that will be used
function Logger(msg) {
    return function (constructor) {
        console.log('LOGGER FUNCTION MESSAGE ' + msg);
    };
}
function WithTemplate(template, id) {
    return function (constructor) {
        const p = new constructor();
        const rootEl = document.getElementById(id);
        if (rootEl)
            rootEl.innerHTML = `<h1>${template} for ${p.name}</h1>`;
    };
}
let Person = class Person {
    constructor() {
        this.name = 'sunny';
        console.log('Creating person object for ' + this.name);
    }
};
Person = __decorate([
    Logger('LOGGING - PERSON'),
    WithTemplate('Person Object', 'root')
], Person);
/* ---> 2. Property Decorator*/
/* ---> 3. Accessor Decorator*/
/* ---> 4. Method Decorator*/
/* ---> 5. Parameter Decorator -> It wont work for accesors*/
function LogProps(target, propName) {
    console.log(target, propName);
}
function LogAccessors(target, name, descriptor) {
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function LogMethod(target, name, descriptor) {
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function LogParams(target, name, position) {
    console.log(target);
    console.log(name);
    console.log(position);
}
class Product {
    constructor(t, p) {
        this._title = t;
        this._price = p;
    }
    getPiceWithTax(tax) {
        return this._price + tax;
    }
    get title() {
        return this._title;
    }
    set price(value) {
        if (value > 0)
            this._price = value;
        else
            throw new Error('Price should be greater than 0');
    }
}
__decorate([
    LogProps //it runs when class is registered with javaScript not when instance of class will be created
], Product.prototype, "_title", void 0);
__decorate([
    LogMethod,
    __param(0, LogParams)
], Product.prototype, "getPiceWithTax", null);
__decorate([
    LogAccessors
], Product.prototype, "title", null);
/* ---> 6. Modify descriptor of methods*/
function Autobind(_, _2, descriptor) {
    const boundMethod = descriptor.value;
    const newDescription = {
        configurable: true,
        enumerable: false,
        get() {
            return boundMethod.bind(this);
        }
    };
    return newDescription;
}
class Printer {
    constructor() {
        this.msg = 'this works';
    }
    print() {
        console.log(this.msg);
    }
}
__decorate([
    Autobind
], Printer.prototype, "print", null);
const p = new Printer();
const btn = document.querySelector('button');
btn.addEventListener('click', p.print);
