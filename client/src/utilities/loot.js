let count = 7.5;
let inflation = 5;
let arr = [];
let loot = 0;
function fun() {
  for (let i = 25; i <= 55; i++) {
    count = count * 1.2;
    loot += count;
    arr.push({
      age: i,
      exp: i - 21.5,
      package: count,
      inflation: (inflation *= 1.08),
      trueValue: count * ((100 - inflation) / 100),
      "1000equalsTo": 1000 * ((100 - inflation) / 100),
    });
  }
}
fun();
console.log("estimates", loot, arr);
