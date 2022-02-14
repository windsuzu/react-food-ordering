import React from "react";
import styled from "styled-components";

const ControlDiv = styled.div`
    margin-bottom: 0.5rem;

    label {
        font-weight: bold;
        margin-bottom: 0.25rem;
        display: block;
    }

    input {
        font: inherit;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: 20rem;
        max-width: 100%;
    }

    &.invalid label {
        color: #ca3e51;
    }

    &.invalid input {
        border-color: #aa0b20;
        background-color: #ffeff1;
    }
`;

const FormInput = (props) => {
    return (
        <ControlDiv className={props.invalid && "invalid"}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input id={props.input.id} {...props.input} />
        </ControlDiv>
    );
};

export default FormInput;
