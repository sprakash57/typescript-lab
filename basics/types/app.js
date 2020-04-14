//Object types
//Typescript has type inference
// const person: {
//     name: string;
//     age: number;
//     languages: string[];
//     role: [number, string]; //Tuple
// } = {
//     name: 'sunny',
//     age: 29,
//     languages: ['C', 'JS'],
//     role: [2, 'author'] //union type array
// }
//enum is a collection of global attributes;
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["DEV"] = 1] = "DEV";
    Role[Role["TESTER"] = 5] = "TESTER";
})(Role || (Role = {}));
;
var person = {
    name: 'sunny',
    age: 29,
    languages: ['C', 'JS'],
    role: Role
};
console.log(person.role[2]);
for (var _i = 0, _a = person.languages; _i < _a.length; _i++) {
    var lang = _a[_i];
    console.log(lang.toUpperCase());
}
//Tuple = fixed size + fixed data types. eg:- role
