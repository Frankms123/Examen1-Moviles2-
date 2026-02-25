import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {
        try {
            const storedCart = await AsyncStorage.getItem('@FakeStore:cart');
            if (storedCart) {
                setCart(JSON.parse(storedCart));
            }
        } catch (e) {
            console.error('Failed to load cart', e);
        }
    };

    const saveCart = async (newCart) => {
        try {
            await AsyncStorage.setItem('@FakeStore:cart', JSON.stringify(newCart));
        } catch (e) {
            console.error('Failed to save cart', e);
        }
    };

    /**
   * Agrega un producto al carrito. Si ya existe, incrementa su cantidad.
   * Persiste el estado actualizado en AsyncStorage.
   * @param {Object} product - Objeto del producto obtenido de la API.
   */
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);
            let newCart;
            if (existingProduct) {
                newCart = prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                newCart = [...prevCart, { ...product, quantity: 1 }];
            }
            saveCart(newCart);
            return newCart;
        });
    };

    /**
   * Elimina un producto específico del carrito por su ID.
   * @param {number} productId - ID único del producto.
   */
    const removeFromCart = (productId) => {
        setCart((prevCart) => {
            const newCart = prevCart.filter((item) => item.id !== productId);
            saveCart(newCart);
            return newCart;
        });
    };

    const updateQuantity = (productId, amount) => {
        setCart((prevCart) => {
            const newCart = prevCart.map((item) => {
                if (item.id === productId) {
                    const newQuantity = Math.max(0, item.quantity + amount);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            }).filter(item => item.quantity > 0);
            saveCart(newCart);
            return newCart;
        });
    };

    /**
   * Vacía completamente el carrito y limpia AsyncStorage.
   */
    const clearCart = async () => {
        setCart([]);
        await AsyncStorage.removeItem('@FakeStore:cart');
    };

    const getSubtotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getSubtotal }}>
            {children}
        </CartContext.Provider>
    );
};
