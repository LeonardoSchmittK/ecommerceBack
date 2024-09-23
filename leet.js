var mergeAlternately = function (word1, word2) {
  let merged = "";
  let counter1 = 0;
  let counter2 = 0;
  for (let i = 0; i < word1.length + word2.length; ++i) {
    if (i % 2 == 0) {
      merged += word1[counter1] || word2.slice(counter2, word2.length);
      if (!word1[counter1]) {
        break;
      }
      counter1++;
    } else {
      merged += word2[counter2] || word1.slice(counter1, word1.length);
      if (!word2[counter2]) {
        break;
      }
      counter2++;
    }
  }

  return merged;
};

// console.log(mergeAlternately("abc", "pqr"));
console.log(mergeAlternately("ab", "pqrs"));
