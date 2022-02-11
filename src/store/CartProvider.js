import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    if (action.type === "ADD") {
        const updatedTotalAmount =
            state.totalAmount + action.item.price * action.item.amount;

        let updatedItems;
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        if (existingCartItemIndex !== -1) {
            const existingCartItem = state.items[existingCartItemIndex];
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount,
            };

            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }

    if (action.type === "DEL") {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );

        if (existingCartItemIndex !== -1) {
            const existingItem = state.items[existingCartItemIndex];
            const updatedTotalAmount = state.totalAmount - existingItem.price;
            let updatedItems;

            // remove the last item from itemList
            if (existingItem.amount === 1) {
                updatedItems = state.items.filter(
                    (item) => item.id !== action.id
                );
            }
            // remove 1 amount from the item
            else {
                const updatedItem = {
                    ...existingItem,
                    amount: existingItem.amount - 1,
                };
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            }
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount,
            };
        }
    }

    return defaultCartState;
};

const CartProvider = (props) => {
    const [cartState, cartDispatch] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        cartDispatch({ type: "ADD", item });
    };
    const removeItemFromCartHandler = (id) => {
        cartDispatch({ type: "DEL", id });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;
