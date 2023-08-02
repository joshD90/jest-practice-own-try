import { CartItem } from "../cartItem/CartItem";
import Cart from "./Cart";

import { Product } from "../productClass/Product";

const mockGetProduct = jest.fn(() => ({
  getPrice: mockGetProductPrice,
  getName: mockGetProductName,
}));

const mockGetProductPrice = jest.fn();
const mockGetProductName = jest.fn();
const mockGetProductQuantity = jest.fn();

jest.mock("../productClass/Product.ts", () => {
  return {
    Product: jest.fn().mockImplementation(() => ({
      getPrice: mockGetProductPrice,
      getName: mockGetProductName,
    })),
  };
});

jest.mock("../cartItem/CartItem.ts", () => {
  return {
    CartItem: jest.fn().mockImplementation(() => ({
      getProduct: mockGetProduct,
      getQuantity: mockGetProductQuantity,
      setQuantity: jest.fn(),
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
    mockGetProductQuantity.mockImplementation(() => 1);
    mockGetProductPrice.mockImplementation(() => 200);

    mockedProduct1 = new Product(1, "Product A", 100);
    mockedProduct2 = new Product(2, "Product B", 200);

    const mockGetProduct1Name = jest.fn();
    mockGetProduct1Name.mockReturnValue("Product 1");
    mockedProduct1.getName = mockGetProduct1Name;

    const mockGetProduct2Name = jest.fn();
    mockGetProduct2Name.mockReturnValue("Product 2");
    mockedProduct2.getName = mockGetProduct2Name;

    cartItem1 = new CartItem(mockedProduct1, 2);
    cartItem2 = new CartItem(mockedProduct2, 2);
    sut = new Cart([cartItem1, cartItem2]);
  });

  afterEach(() => jest.clearAllMocks());

  it("should create a proper cart with working getters", () => {
    expect(sut.getCartItems()).toHaveLength(2);
    expect(sut.getTotalItems()).toBe(2);
    expect(sut.getTotalPrice()).toBe(400);
    expect(sut.getTotalPriceString()).toBe("€4.00");
  });

  it("should add an item in correctly when the name is different", () => {
    //create a dummy product
    const mockedProduct3 = new Product(0, "", 0);
    const mockedCartItem3 = new CartItem(mockedProduct3, 3);

    const mockGetProduct3Name = jest.fn();
    mockGetProduct3Name.mockReturnValue("Product 3");
    mockedProduct1.getName = mockGetProduct3Name;

    sut.addCartItem(mockedCartItem3);

    expect(sut.getCartItems()).toHaveLength(3);
    expect(sut.getTotalItems()).toBe(3);
    expect(sut.getTotalPrice()).toBe(600);
    expect(sut.getTotalPriceString()).toBe("€6.00");
  });

  it("should merge and add quantities if the names match", () => {
    sut.addCartItem(cartItem1);

    expect(sut.getCartItems()).toHaveLength(2);
  });
});
