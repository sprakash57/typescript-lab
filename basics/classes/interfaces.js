var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.greet = function (p) {
        console.log(p + ' ' + this.name);
    };
    return Person;
}());
var user1 = new Person('Sunny');
user1.greet('good morning');
var add;
add = function (a, b) { return a + b; };
