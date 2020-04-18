const names = ['sunny', 'prakash'];
//Generics will enable vs code to support developer with better type safety and provide additonal information
const promise = new Promise((res, rej) => {
    setTimeout(() => {
        res('done');
    }, 2000);
});
/* Create your own generic*/
//without generic
function merge(a, b) {
    return Object.assign(a, b);
}
const newObj = merge({ name: 'sunny' }, { age: 29 });
console.log(newObj.name);
