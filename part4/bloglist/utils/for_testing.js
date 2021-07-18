const palindrome = (string) => {
  return string.split("").reverse().join("");
};

const average = (array) => {
  return array.reduce((sum, item) => sum + item, 0) / array.length;
};

module.exports = {
  palindrome,
  average,
};
