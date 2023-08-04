import { CartItem } from "../cartItem/CartItem";
import Cart from "./Cart";

import { Product } from "../productClass/Product";

const mockSetQuantity = jest.fn();
const mockUpdateTotals = jest.fn();

jest.mock("../productClass/Product.ts", () => {
  return {
    Product: jest.fn((id: number, name: string, price: number) => ({
      getPrice: jest.fn().mockReturnValue(price),
      getName: jest.fn().mockReturnValue(name),
    })),
  };
});

jest.mock("../cartItem/CartItem.ts", () => {
  return {
    CartItem: jest.fn((product: Product, quantity: number) => ({
      getProduct: jest.fn().mockReturnValue(product),
      getQuantity: jest.fn().mockReturnValue(quantity),
      setQuantity: mockSetQuantity,
      updateTotals: mockUpdateTotals,
    })),
  };
});

describe("test suite for Cart Class", () => {
  let sut: Cart;
  let mockedProduct1: Product;
  let mockedProduct2: Product;
  let cartItem1: CartItem;
  let cartItem2: CartItem;

  beforeEach(() => {
    mockedProduct1 = new Product(1, "Product A", 100);
    mockedProduct2 = new Product(2, "Product B", 200);

    cartItem1 = new CartItem(mockedProduct1, 2);
    cartItem2 = new CartItem(mockedProduct2, 2);

    sut = new Cart("joshCart", [cartItem1, cartItem2]);
  });

  afterEach(() => jest.clearAllMocks());

  it("should create a proper cart with working getters", () => {
    expect(sut.getCartItems()).toHaveLength(2);
    expect(sut.getTotalItems()).toBe(4);
    expect(sut.getTotalPrice()).toBe(600);
    expect(sut.getTotalPriceString()).toBe("€6.00");
  });

  it("should add an item in correctly when the name is different", () => {
    //create a dummy product
    const mockedProduct3 = new Product(3, "Product C", 500);
    const mockedCartItem3 = new CartItem(mockedProduct3, 3);

    sut.addCartItem(mockedCartItem3);

    expect(sut.getCartItems()).toHaveLength(3);
    expect(sut.getTotalItems()).toBe(7);
    expect(sut.getTotalPrice()).toBe(2100);
    expect(sut.getTotalPriceString()).toBe("€21.00");
  });

  it("should merge and add quantities if the names match", () => {
    const updateTotalsSpy = jest.spyOn(sut, "updateTotals" as keyof Cart);

    sut.addCartItem(cartItem1);

    expect(sut.getCartItems()).toHaveLength(2);
    expect(mockSetQuantity).toBeCalledTimes(1);
    expect(mockSetQuantity).toBeCalledWith(4);
    expect(updateTotalsSpy).toBeCalledTimes(1);
  });

  it("should remove a cart item from the list", () => {
    const updateTotalsSpy = jest.spyOn(sut, "updateTotals" as keyof Cart);

    sut.removeCartItem(cartItem1);

    expect(sut.getCartItems()).toHaveLength(1);
    expect(updateTotalsSpy).toBeCalledTimes(1);
    expect(sut.getCartItems()[0]).toBeTruthy();
    expect(sut.getCartItems()[0].getProduct().getName()).toBe("Product B");
    expect(sut.getTotalItems()).toBe(2);
    expect(sut.getTotalPrice()).toBe(400);
  });
});
