import Cart from "../cart/Cart";
import User from "./User";

jest.mock("../cart/Cart", () => {
  return function () {
    return {
      __esModule: true,
      default: jest
        .fn()
        .mockImplementation(() => ({ getCartName: mockGetCartName })),
    };
  };
});

const mockGetCartName = jest.fn();

describe("User class test suite", () => {
  const sut = new User("Josh", 1);
  const cart1 = new Cart("cart1");

  // beforeEach(()=>{
  //     sut.addCart(cart1);
  // })

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
