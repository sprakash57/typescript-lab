const names: Array<string> = ['sunny', 'prakash'];
//Generics will enable vs code to support developer with better type safety and provide additonal information
const promise: Promise<string> = new Promise((res, rej) => {
    setTimeout(() => {
        res('done');
    }, 2000)
})

/* ---> 1. Create your own generic*/
//without generic
// function merge(a: object, b: object) {
//     return Object.assign(a, b);
// }

// const newObj = merge({ name: 'sunny' }, { age: 29 })
//console.log(newObj.name) // --> Not possible to access since newObj type doesn't carry all information
//there could be two solution
//1. use typecasting for newObj
//const newObj = merge({ name: 'sunny' }, { age: 29 }) as {name: string, age: string}
//2.crete your own generic
function merge<T, U extends object | number>(a: T, b: U) {//T and U doesn't set here but when it will be called. It will take the form of arguments of called function
    return Object.assign(a, b);
}

const newObj = merge({ name: 'sunny' }, { age: 30 });
const newObj2 = merge({ name: 'sunny' }, 30);
console.log(newObj.name)//---> Here vs code detects that newObj has name and age property
//extends in generic work like constraints

/* ---> 2. CGeneric class*/
class Store<T> {
    private data: T[] = [];
    addItem(item: T) {
        this.data.push(item);
    }
    removeItem(item: T) {
        this.data = this.data.filter(d => d !== item);
    }
    getItems() {
        return [...this.data];
    }
}
//now we can create our own store types
const textStore = new Store<string>()
const numStore = new Store<number>()
const objStore = new Store<object>()
//generics = flexibility + type safety

/* 3. Utility function */
//Partial: It will create a wrapper araound your interface
interface Fullname {
    first: string,
    last: string
}

function getName(f: string, l: string): Fullname {
    let name: Partial<Fullname> = {};
    name.first = f;
    name.last = l;
    return name as Fullname;
}
//Readonly
const arr: Readonly<number[]> = [1, 2];
// arr.push(3); ---> won't work since arr is readonly
