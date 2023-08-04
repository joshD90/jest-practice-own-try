import Cart from "../cart/Cart";

class User {
  private name: string;
  private id: number;
  private carts: Cart[];

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
    this.carts = [];
  }
  //update users carts
  public addCart(cart: Cart) {
    this.carts = [...this.carts, cart];
  }
  public removeCart(name: string) {
    this.carts = this.carts.filter((cart) => {
      console.log(cart, "cart");
      return cart.getCartName() !== name;
    });
  }

  public getCartByName(name: string): Cart | undefined {
    const foundCart = this.carts.find((cart) => {
      return cart.getCartName() === name;
    });
    return foundCart;
  }
  public getFirstCart(): Cart | undefined {
    return this.carts[0];
  }
  // Getters
  public getName(): string {
    return this.name;
  }

  public getId(): number {
    return this.id;
  }

  public getCarts(): Cart[] {
    return this.carts;
  }

  // Setters
  public setName(name: string): void {
    this.name = name;
  }

  public setId(id: number): void {
    this.id = id;
  }
}

export default User;
