import Cart from "../cart/Cart";
import User from "./User";

//correct way to mock
jest.mock("../cart/Cart", () => {
  return jest.fn().mockImplementation(() => {
    return { getCartName: mockGetCartName };
  });
});

const mockGetCartName = jest.fn().mockReturnValue("cart1");

describe("User class test suite", () => {
  const sut = new User("Josh", 1);
  const cart1 = new Cart("cart1");

  afterEach(() => jest.clearAllMocks());

  it("should add a cart to user", () => {
    sut.addCart(cart1);
    expect(sut.getCarts()).toHaveLength(1);
    expect(sut.getFirstCart().getCartName()).toBe("cart1");
  });
  it("should remove a cart from user", () => {
    sut.addCart(cart1);
    sut.removeCart("cart1");
    expect(sut.getCarts()).toHaveLength(0);
  });
});
