var addStrings = function (num1, num2) {
  let greatestQuantity;
  let smallestQuantity;
  let greatestNum;
  let smallestNum;

  if (num1.length > num2.length) {
    greatestQuantity = num1.length - 1;
    smallestQuantity = num2.length - 1;
    greatestNum = num1;
    smallestNum = num2;
  } else {
    greatestQuantity = num2.length - 1;
    smallestQuantity = num1.length - 1;
    greatestNum = num2;
    smallestNum = num1;
  }

  let res = [];

  let sum = 0;
  let rest = 0;
  for (let i = greatestQuantity; i >= 0; --i) {
    sum =
      Number(greatestNum[greatestQuantity] || 0) +
      Number(smallestNum[smallestQuantity] || 0) +
      rest +
      "";
    res.push(sum.split(""));
    smallestQuantity--;
    greatestQuantity--;

    if (res.length > 1) {
      rest = res[1];
    } else {
      rest = 0;
    }
  }
  return res.reverse().join("");
};

console.log(addStrings("456", "77"));
