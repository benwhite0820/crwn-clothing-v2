import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
    const currentItem = cartItems.find(({ id }) => id === productToAdd.id);
    if (currentItem) {
        return cartItems.map((item) =>
            item.id === productToAdd.id
                ? {
                      ...item,
                      quantity: Number(item.quantity) + 1,
                  }
                : item
        );
    }
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    totalQuantity: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        cartItems,
        totalQuantity,
    };

    useEffect(() => {
        const totalQuantity = cartItems.reduce(
            (acc, curr) => acc + curr.quantity,
            0
        );

        setTotalQuantity(totalQuantity);
    }, [cartItems]);

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
