import { describe, it, expect } from 'vitest';

describe('sum test', () => {
  it('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
  });
});

describe("Hello world", () => {
  it("Add hello and world to be hello world", () => {
    expect("Hello " + "World").toBe("Hello World!")
  })
})
