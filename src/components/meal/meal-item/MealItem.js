import React from "react";
import styled from "styled-components";
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
`;

const MealItem = (props) => {
    const price = `$${props.price.toFixed(2)}`;

    return (
        <StyledItem>
            <div>
                <h3>{props.name}</h3>
                <h3 className="description">{props.description}</h3>
                <h3 className="price">{price}</h3>
            </div>
            <div>
                <MealItemForm id={props.id} />
            </div>
        </StyledItem>
    );
};

export default MealItem;
