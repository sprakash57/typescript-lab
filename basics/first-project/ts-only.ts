const btn = document.querySelector("button");
const ip1 = document.getElementById("num1")! as HTMLInputElement;
const ip2 = document.getElementById("num2")! as HTMLInputElement;

function addNum(num1: number, num2: number) {
    return num1 + num2;
}

btn.addEventListener("click", function () {
    console.log(addNum(+ip1.value, +ip2.value));
});

//It will spit out ts-only.js file after compilation
