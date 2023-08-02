import { Product } from "../productClass/Product";
import { CartItem } from "./CartItem";

jest.mock("../productClass/Product.ts");

describe("CartItem test Suite", () => {
  let product = new Product(1, "Product A", 100);
  let sut: CartItem;
  beforeEach(() => {
    sut = new CartItem(product, 1);
  });

  it("should return the quantity", () => {
    const actual = 1;
    expect(sut.getQuantity()).toBe(actual);
  });
  it("should throw an error if negative amount given", () => {
    expect(() => sut.setQuantity(-1)).toThrowError(
      "Cannot have negative items"
    );
  });
  it("should set the correct amount", () => {
    sut.setQuantity(10);
    expect(sut.getQuantity()).toBe(10);
  });
});
