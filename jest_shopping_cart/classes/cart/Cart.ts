import { CartItem } from "../cartItem/CartItem";

class Cart {
  private cartItems: CartItem[];
  private totalPrice: number;
  private totalPriceString: string;
  private totalItems: number;

  constructor(cartItems?: CartItem[]) {
    if (!cartItems) {
      this.cartItems = [];
    } else {
      this.cartItems = cartItems;
    }
    this.updateTotals();
  }

  public addCartItem(cartItem: CartItem) {
    const indexOfItem = this.cartItems.findIndex(
      (item) => item.getProduct().getName() === cartItem.getProduct().getName()
    );
    if (indexOfItem === -1) {
      this.cartItems = [...this.cartItems, cartItem];
    } else {
      this.cartItems[indexOfItem].setQuantity(
        cartItem.getQuantity() + this.cartItems[indexOfItem].getQuantity()
      );
    }

    this.updateTotals();
  }

  public removeCartItem(cartItem: CartItem) {
    this.cartItems = this.cartItems.filter(
      (item) => item.getProduct() !== cartItem.getProduct()
    );

    this.updateTotals();
  }

  private calcTotalPrice(): number {
    if (this.cartItems.length === 0) return 0;
    const accumulatedPrice = this.cartItems.reduce(
      (accumulator, currentValue) =>
        accumulator +
        currentValue.getProduct().getPrice() * currentValue.getQuantity(),
      0
    );
    return accumulatedPrice;
  }
  private calcTotalItems(): number {
    if (this.cartItems.length === 0) return 0;
    const accumulatedItems = this.cartItems.reduce(
      (accumulator, currentValue) => {
        console.log(currentValue, "currentValue");
        console.log(currentValue.getQuantity());
        return accumulator + currentValue.getQuantity();
      },
      0
    );

    return accumulatedItems;
  }

  private updateTotals() {
    this.totalPrice = this.calcTotalPrice();
    this.totalItems = this.calcTotalItems();
    this.setTotalPriceString();
  }

  //getters - no setters as these are done through add item / remove item functionality
  public setTotalPriceString() {
    this.totalPriceString = `€${(this.totalPrice / 100).toFixed(2)}`;
  }
  public getCartItems(): CartItem[] {
    return this.cartItems;
  }

  public getTotalPrice(): number {
    return this.totalPrice;
  }
  public getTotalItems(): number {
    return this.totalItems;
  }
  public getTotalPriceString(): string {
    return this.totalPriceString;
  }
}

export default Cart;
