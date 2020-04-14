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
enum Role { ADMIN, DEV, TESTER = 5 };

const person = {
    name: 'sunny',
    age: 29,
    languages: ['C', 'JS'],
    role: Role
}

console.log(person.role[2])
for (const lang of person.languages) {
    console.log(lang.toUpperCase());
}

//Tuple = fixed size + fixed data types. eg:- role
