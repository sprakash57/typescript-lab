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

//TYpe guards -
//typeof, in, instanceof(only for objects

//Descriminated Unions
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

//Type Casting
//two ways
//1.
const input1 = document.getElementById('dummy-para')! as HTMLInputElement;
input1.value = '';
//2.
const input2 = <HTMLInputElement>document.getElementById('dummy-para')!