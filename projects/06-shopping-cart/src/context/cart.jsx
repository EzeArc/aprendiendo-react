import { createContext, useReducer, useState } from "react";
import { cartReducer, cartInitialState } from "../reducers/cart";

export const CartContext = createContext();

function useCartReducer() {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  const addToCart = (product) =>
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });

  const removeFromCart = (product) =>
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: product,
    });

  const clearCart = () =>
    dispatch({
      type: "CLEAR_CART",
    });

  return { state, addToCart, clearCart, removeFromCart };
}

export function CartProvider({ children }) {
  const { state, addToCart, clearCart, removeFromCart } = useCartReducer();
  /* ⬇⬇ Logica sin reducer, usando useState ⬇⬇
  //const [cart, setCart] = useState([]);

  // const addToCart = (product) => {
  //   //Forma sencilla de añadir un producto ⬇⬇
  //   //    setCart([...cart, product])
  //   //Check if the product is already in the cart
  //   const productInCartIndex = cart.findIndex((item) => item.id === product.id);

  //   if (productInCartIndex >= 0) {
  //     //Hacemos un copia profunda del array y los objetos
  //     const newCart = structuredClone(cart);
  //     newCart[productInCartIndex].quantity += 1;
  //     return setCart(newCart);
  //   }

  //   // producto no está en el carrito
  //   setCart((prevState) => [...prevState, { ...product, quantity: 1 }]);
  // };

  // const removeFromCart = (product) => {
  //   //Recibe como primer parametro el valor anterior del estado y devuelve el nuevo valor del estado
  //   setCart((prevState) => prevState.filter((item) => item.id !== product.id));
  // };

  // const clearCart = () => {
  //   setCart([]);
  // }; 
  */
  return (
    <CartContext.Provider
      value={{ cart: state, addToCart, clearCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
