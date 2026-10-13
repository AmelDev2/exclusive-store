import { useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { supabase } from "../supabaseClient";

export const CartProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user || null;
      setCurrentUser(user);
      if (user?.email) {
        const saved = localStorage.getItem(`exclusive_cart_${user.email}`);
        setCartItems(saved ? JSON.parse(saved) : []);
      } else {
        setCartItems([]);
      }
    });

    supabase.auth.getUser().then(({ data: { user } }) => {
      setCurrentUser(user);
      if (user?.email) {
        const saved = localStorage.getItem(`exclusive_cart_${user.email}`);
        setCartItems(saved ? JSON.parse(saved) : []);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser?.email) {
      localStorage.setItem(`exclusive_cart_${currentUser.email}`, JSON.stringify(cartItems));
    }
  }, [cartItems, currentUser]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id.toString() === product.id.toString(),
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += product.quantity || 1;
        return updated;
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id.toString() !== id.toString()),
    );
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) return removeFromCart(id);
    setCartItems((prev) =>
      prev.map((item) =>
        item.id.toString() === id.toString() ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setCartItems([]);
    if (currentUser?.email) {
      localStorage.removeItem(`exclusive_cart_${currentUser.email}`);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};