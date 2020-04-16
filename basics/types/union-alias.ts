//Type alias
type Joinable = number | string
type User = { name: string, age: number }

//Union type
function concat(input1: number | string, input2: number | string) {
    if (typeof input1 === 'number' && typeof input2 === 'number')
        return input1 + input2;
    return input1.toString() + input2.toString();
}

//Literal type
function combine(m: Joinable, n: Joinable, conversion: 'as-number' | 'as-text') {
    let result;
    if (typeof m === 'number' && typeof n === 'number')
        result = m + n;
    else
        result = m.toString() + n.toString();
    if (conversion === 'as-number') return +result
    else return result.toString()
}