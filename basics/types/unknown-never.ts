let userName: string;
let input1: unknown;
let input2: any

userName = 'sunny'
input1 = 5;
input2 = 5;
if (typeof input1 === 'string') {
    userName = input1
}
userName = input2
//unknown is little more strict than any

function createError(message: string, code: number): never {
    throw { message, code }
}