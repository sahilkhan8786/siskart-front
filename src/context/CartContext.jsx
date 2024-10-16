import React, { createContext, useState, useEffect } from 'react';

// Create the CartContext
export const CartContext = createContext();

// CartProvider Component
export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);  // Add loading state

    // Load cart from localStorage when component mounts
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));  // Parse and set the cart from localStorage
        }
        setLoading(false);  // Cart has finished loading
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart));  // Update localStorage whenever the cart state changes
        } else {
            localStorage.removeItem('cart');  // Remove from localStorage if cart is empty
        }
    }, [cart]);

    // Add item to cart
    const addItemToCart = (item) => {
        setCart((prevCart) => {
            const itemExists = prevCart.find((cartItem) => cartItem._id === item._id);
            if (itemExists) {
                return prevCart.map((cartItem) =>
                    cartItem._id === item._id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });
    };

    // Update item quantity in cart
    const updateItemQuantity = (_id, quantity) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item._id === _id ? { ...item, quantity: Math.max(quantity, 1) } : item
            )
        );
    };

    // Remove item from cart
    const removeItemFromCart = (_id) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== _id));
    };

    // Clear cart
    const clearCart = () => {
        setCart([]);  // Clear the cart
        localStorage.removeItem('cart');
    };

    // Calculate total price
    const calculateTotal = () => {
        return cart.reduce(
            (total, item) => total + item.MRP * item.quantity,
            0
        );
    };
    const calculateTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const quotationItemsIds = () => {
        return cart.map(item => ({
            productsId: item._id,
            quantity: item.quantity
        }));
    };

    // Context value
    const value = {
        cart,
        loading,  // Expose loading state
        addItemToCart,
        updateItemQuantity,
        removeItemFromCart,
        clearCart,
        calculateTotal,
        quotationItemsIds,
        calculateTotalItems
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
