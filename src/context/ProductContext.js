import React, { useState, useContext, createContext, useEffect } from "react";
import { db } from "../../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const ProductContext = createContext([]);

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let productsArr = [];
      querySnapshot.forEach((doc) => {
        productsArr.push({ ...doc.data(), id: doc.id });
      });
      setProducts(productsArr);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        loading,
        setLoading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
