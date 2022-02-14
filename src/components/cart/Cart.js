import React, { useContext, useState } from "react";
import styled from "styled-components";
import CartContext from "../../store/cart-context";
import Modal from "../ui/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const CartItems = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    max-height: 20rem;
    overflow: auto;
`;

const TotalDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-size: 1.5rem;
    margin: 1rem 0;
`;

const ActionDiv = styled.div`
    text-align: right;
    button {
        font: inherit;
        cursor: pointer;
        background-color: transparent;
        border: 1px solid #8a2b06;
        padding: 0.5rem 2rem;
        border-radius: 25px;
        margin-left: 1rem;
    }

    button:hover,
    button:active {
        background-color: #5a1a01;
        border-color: #5a1a01;
        color: white;
    }

    button.order {
        background-color: #8a2b06;
        color: white;
    }

    button.close {
        color: #8a2b06;
    }
`;

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const [isCheckout, setIsCheckout] = useState(false);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItems = (
        <CartItems>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </CartItems>
    );

    const modalActions = (
        <ActionDiv>
            <button className="close" onClick={props.onCloseCart}>
                Close
            </button>
            {hasItems && (
                <button className="order" onClick={() => setIsCheckout(true)}>
                    Order
                </button>
            )}
        </ActionDiv>
    );

    return (
        <Modal onCloseCart={props.onCloseCart}>
            {cartItems}
            <TotalDiv>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </TotalDiv>
            {isCheckout && <Checkout onCancel={props.onCloseCart} />}
            {!isCheckout && modalActions}
        </Modal>
    );
};

export default Cart;
