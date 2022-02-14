import React from "react";
import styled from "styled-components";

const StyledInput = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;

    label {
        font-weight: bold;
        margin-right: 1rem;
        @media (max-width: 768px) {
            font-size: 0.5rem;
        }
    }

    input {
        width: 3rem;
        border-radius: 5px;
        border: 1px solid #ccc;
        font: inherit;
        padding-left: 0.5rem;

        @media (max-width: 768px) {
            font-size: 0.5rem;
        }
    }
`;

const Input = React.forwardRef((props, ref) => {
    return (
        <StyledInput>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} id={props.input.id} {...props.input} />
        </StyledInput>
    );
});

export default Input;
