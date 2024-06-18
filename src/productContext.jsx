import React, { createContext, useContext, useEffect, useState } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState(()=>{
        const savedCartItems = localStorage.getItem('cartItems')
        return JSON.parse(savedCartItems || '[]')
    });

    useEffect(()=>{
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])

    

    const addToCart = (product) => {
        setCartItems((prevCartItems) => [...prevCartItems, product]);
    };

    const removeFromCart = (itemId) => {
        setCartItems((prevCartItems) => prevCartItems.filter(item => item._id!== itemId));
      };
   
 

    return (
        <ProductContext.Provider value={{ cartItems, addToCart , removeFromCart}}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => useContext(ProductContext);