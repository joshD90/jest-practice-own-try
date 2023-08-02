import { Product } from "./Product";

describe("Product Class Test Suite", () => {
  let sut: Product;

  beforeEach(() => {
    sut = new Product(2, "Product A", 127);
  });

  it("should create a price string with Euro and two decimal places", () => {
    const actual = "€1.27";
    expect(sut.getPriceString()).toBe(actual);
  });
});
