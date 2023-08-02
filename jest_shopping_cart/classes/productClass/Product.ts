export class Product {
  private id: number;
  private name: string;
  private price: number;
  private priceString: string;

  constructor(id: number, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.priceString = this.setPriceString();
  }

  private setPriceString() {
    const priceString = `€${(this.price / 100).toFixed(2)}`;
    return priceString;
  }

  //getters and setters
  public getId(): number {
    return this.id;
  }

  public setId(newId: number) {
    this.id = newId;
  }

  public getName(): string {
    return this.name;
  }

  public setName(newName: string) {
    this.name = newName;
  }

  public getPrice(): number {
    return this.price;
  }

  public setPrice(newPrice: number) {
    this.price = newPrice;
    this.setPriceString();
  }

  public getPriceString(): string {
    return this.priceString;
  }
}
