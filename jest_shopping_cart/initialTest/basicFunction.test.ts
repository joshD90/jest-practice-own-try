import { basicFunction } from "./basicFunction";

describe("Testing Basic Function suite", () => {
  it("should add the two numbers together correctly", () => {
    const sut = basicFunction(2, 5);

    const actual = 7;

    expect(sut).toBe(actual);
  });
});
