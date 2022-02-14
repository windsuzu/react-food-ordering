import React, { useContext } from "react";
import styled from "styled-components";
import CartContext from "../../../store/cart-context";
import MealItemForm from "./MealItemForm";

const StyledItem = styled.li`
    display: flex;
    justify-content: space-between;
    margin: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #ccc;

    h3 {
        margin: 0 0 0.25rem 0;
    }

    h3.description {
        font-style: italic;
    }

    h3.price {
        margin-top: 0.25rem;
        font-weight: bold;
        color: #ad5502;
        font-size: 1.25rem;
    }

    @media (max-width: 768px) {
        h3 {
            font-size: 0.9rem;

            &.price {
                font-size: 1.1rem;
            }
        }
    }
`;

const MealItem = (props) => {
    const cartCtx = useContext(CartContext);

    const addToCartHandler = (amount) => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price,
        });
    };

    const price = `$${props.price.toFixed(2)}`;

    return (
        <StyledItem>
            <div>
                <h3>{props.name}</h3>
                <h3 className="description">{props.description}</h3>
                <h3 className="price">{price}</h3>
            </div>
            <div>
                <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
            </div>
        </StyledItem>
    );
};

export default MealItem;
