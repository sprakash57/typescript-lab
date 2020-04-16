function add(m: number, n: number): number {
    return m + n;
}

function addCallback(m: number, n: number, cb: (o: number) => void) {
    const result = m + n;
    cb(result);
}

function print(num: number): void {
    console.log('Result: ' + num);
}
//Function type
let combined: (a: number, b: number) => number;
//combined = 5       X Fail
//combined = print   X Fail
combined = add     //PASS

addCallback(5, 4, (result) => {
    return result.toString()
})