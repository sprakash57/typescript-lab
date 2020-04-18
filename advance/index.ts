/* ----> 1. Intersection type*/
type Admin = {
    name: string,
    privilage: string[];
}

type Employee = {
    name: string,
    joiningDate: Date
}

type ElevationType = Admin & Employee;

const el: ElevationType = {
    name: 'sunny',
    privilage: ['admin'],
    joiningDate: new Date()
}

//interface inheritance
//intersection can be used with any type eg- union + union 

/* ----> 2. Type guard*/
//typeof, in, instanceof(only for objects)

/* ----> 3. Descriminated Unions*/
interface Bird {
    type: 'bird',
    flyingSpeed: number
}

interface Horse {
    type: 'horse',
    sprintSpeed: number
}

type Animal = Bird | Horse;

function moveAnimal(a: Animal) {
    let speed;
    switch (a.type) {
        case 'bird':
            speed = a.flyingSpeed;
            break;
        case 'horse':
            speed = a.sprintSpeed;
            break;
    }
    console.log('Moving with speed ' + speed);
}

moveAnimal({ type: 'bird', flyingSpeed: 10 })

/* ----> 4. Type casting*/
//two ways
//1.
const input1 = document.getElementById('dummy-para')! as HTMLInputElement;
input1.value = '';
//2.
const input2 = <HTMLInputElement>document.getElementById('dummy-para')!

/* ----> 5. Index Properties*/
//Its good to have some utility that can generate object with different properties depending on the situation
interface ErrorContainer {
    [props: string]: string
}
//examples
const badEmail: ErrorContainer = {
    email: 'Not a valid email'
}

const badPassword: ErrorContainer = {
    password: 'Password must be of 6 chars',
    username: 'missing username'
}

/* ----> 6. Function overloads*/
type Plus = string | number;

function add(a: number, b: number): number; // <--- this is number overload
function add(a: string, b: string): string; // <--- this is string overload
function add(a: Plus, b: Plus) {
    if (typeof a === 'string' || typeof b === 'string') return a.toString() + b.toString();
    return a + b;
}

//example
const result = add("sunny", "pr");
result.split('');

/* ----> 7. Optional chaining*/
const fetchedData = {
    name: 'sunny',
    id: 'a001',
    job: { exp: 5, skill: 'js' }
}

console.log(fetchedData?.job.skill) //if fetchedData exist then check for job

/* ----> 8. Nullish Coalescing*/
const response = null;
const storedData = response || 'Default' //fail in case of empty string.
const stashData = response ?? 'Default'; //?? check for null and undefined only.
