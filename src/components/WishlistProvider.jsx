import { useState, useEffect } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { supabase } from "../supabaseClient";

export const WishlistProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user || null;
      setCurrentUser(user);
      if (user?.email) {
        const saved = localStorage.getItem(`exclusive_wishlist_${user.email}`);
        setWishlistItems(saved ? JSON.parse(saved) : []);
      } else {
        setWishlistItems([]);
      }
    });

    supabase.auth.getUser().then(({ data: { user } }) => {
      setCurrentUser(user);
      if (user?.email) {
        const saved = localStorage.getItem(`exclusive_wishlist_${user.email}`);
        setWishlistItems(saved ? JSON.parse(saved) : []);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser?.email) {
      localStorage.setItem(`exclusive_wishlist_${currentUser.email}`, JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, currentUser]);

  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.some(
        (item) => item.id.toString() === product.id.toString()
      );
      if (exists) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) =>
      prev.filter((item) => item.id.toString() !== id.toString())
    );
  };

  const toggleWishlist = (product) => {
    const exists = wishlistItems.some(
      (item) => item.id.toString() === product.id.toString()
    );
    if (exists) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    if (currentUser?.email) {
      localStorage.removeItem(`exclusive_wishlist_${currentUser.email}`);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};