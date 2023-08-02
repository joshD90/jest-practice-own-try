import { Product } from "../productClass/Product";

export class CartItem {
  private product: Product;
  private quantity: number;

  constructor(product: Product, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }

  //setters
  public setQuantity(num: number) {
    if (num < 0) throw new Error("Cannot have negative items");
    this.quantity = num;
  }

  //getters
  public getProduct(): Product {
    return this.product;
  }
  public getQuantity(): number {
    return this.quantity;
  }
}
