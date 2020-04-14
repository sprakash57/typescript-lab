var btn = document.querySelector("button");
var ip1 = document.getElementById("num1");
var ip2 = document.getElementById("num2");
function addNum(num1, num2) {
    return num1 + num2;
}
btn.addEventListener("click", function () {
    console.log(addNum(+ip1.value, +ip2.value));
});
