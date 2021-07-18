const average = require("../utils/for_testing").average;

// Describe is just for naming the block of test (i.e. legend)
describe("average", () => {
  test("value of: ", () => {
    expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5);
  });
});
