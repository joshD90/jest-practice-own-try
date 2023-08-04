import Cart from "./classes/cart/Cart";
import { CartItem } from "./classes/cartItem/CartItem";
import { Product } from "./classes/productClass/Product";
import User from "./classes/userClass/User";

const product1 = new Product(1, "Product 1", 200);
const product2 = new Product(2, "Product 2", 300);

const cartItem1 = new CartItem(product1, 2);
const cartItem2 = new CartItem(product2, 1);

const cart = new Cart("joshCart");

const josh = new User("Josh", 1);
josh.addCart(cart);
josh.getFirstCart()?.addCartItem(cartItem1);
josh.getFirstCart()?.addCartItem(cartItem2);
josh.getFirstCart()?.getCartItems()[0].setQuantity(1);
