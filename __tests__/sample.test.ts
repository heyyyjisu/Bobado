function add(a: number, b: number): number {
  return a + b;
}

test("1 + 2 equals 3", () => {
  expect(add(1, 2)).toBe(3);
});
