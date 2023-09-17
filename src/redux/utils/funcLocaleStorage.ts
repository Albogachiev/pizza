import { CartItem } from "../slices/cartSlice";
export function getCartFromLS () {
    const data = localStorage.getItem('cart');
    const items =  data ? JSON.parse(data) : [];
    const totalPrice = getPriceCountCart(items);
    return {
        totalPrice,
        items: items as CartItem[],
    }
}

export function getPriceCountCart (items:CartItem[]) {
  return items.reduce((sum, el) => {
        return el.price * el.count + sum
    },0)
}