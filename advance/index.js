var _a;
var el = {
    name: 'sunny',
    privilage: ['admin'],
    joiningDate: new Date()
};
function moveAnimal(a) {
    var speed;
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
moveAnimal({ type: 'bird', flyingSpeed: 10 });
/* ----> 4. Type casting*/
//two ways
//1.
var input1 = document.getElementById('dummy-para');
input1.value = '';
//2.
var input2 = document.getElementById('dummy-para');
//examples
var badEmail = {
    email: 'Not a valid email'
};
var badPassword = {
    password: 'Password must be of 6 chars',
    username: 'missing username'
};
function add(a, b) {
    if (typeof a === 'string' || typeof b === 'string')
        return a.toString() + b.toString();
    return a + b;
}
//example
var result = add("sunny", "pr");
result.split('');
/* ----> 7. Optional chaining*/
var fetchedData = {
    name: 'sunny',
    id: 'a001'
};
console.log((_a = fetchedData === null || fetchedData === void 0 ? void 0 : fetchedData.job) === null || _a === void 0 ? void 0 : _a.skill);
/* ----> 8. Nullish Coalescing*/
var response = null;
var storedData = response || 'Default'; //or
var stashData = response !== null && response !== void 0 ? response : 'Default'; //?? check for null and undefined
