import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const FavProvider = ({ children }) => {
  const [favtItems, setCartItems] = useState([]);

  const addTofav = (item) => {
    setCartItems([...favtItems, item]);
  };

  const removeFromfav = (item) => {
    setCartItems(favtItems.filter((apple) => apple !== item));
  };

  return (
    <CartContext.Provider value={{ favtItems, addTofav, removeFromfav }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
