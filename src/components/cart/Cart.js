import React from "react";
import styled from "styled-components";
import Modal from "../ui/Modal";

const DUMMY_DATA = [
    {
        id: "c1",
        name: "sushi",
        amount: 2,
        price: 12.99,
    },
];

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
    const cartItems = (
        <CartItems>
            {DUMMY_DATA.map((item) => (
                <li>{item.name}</li>
            ))}
        </CartItems>
    );

    return (
        <Modal>
            {cartItems}
            <TotalDiv>
                <span>Total Amount</span>
                <span>35.62</span>
            </TotalDiv>
            <ActionDiv>
                <button className="close">Close</button>
                <button className="order">Order</button>
            </ActionDiv>
        </Modal>
    );
};

export default Cart;
