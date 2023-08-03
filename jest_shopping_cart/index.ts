import Cart from "./classes/cart/Cart";
import { CartItem } from "./classes/cartItem/CartItem";
import { Product } from "./classes/productClass/Product";

const product1 = new Product(1, "Product 1", 200);
const product2 = new Product(2, "Product 2", 300);

const cartItem1 = new CartItem(product1, 2);
const cartItem2 = new CartItem(product2, 1);

const cart = new Cart();

// console.log(cart.getCartItems(), "getCartitems");
// console.log(cart.getTotalItems(), "getTotalItems");
// console.log(cart.getTotalPrice(), "getTotalPrice");

cart.addCartItem(cartItem1);

// console.log(cart.getCartItems(), "getCartitems");
// console.log(cart.getTotalItems(), "getTotalItems");
// console.log(cart.getTotalPrice(), "getTotalPrice");

cart.addCartItem(cartItem2);
cart.addCartItem(cartItem1);
console.log(cart.getCartItems().length, "getCartitems length");
console.log(cart.getTotalItems(), "getTotalItems");
console.log(cart.getTotalPrice(), "getTotalPrice");
