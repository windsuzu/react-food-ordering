import React from "react";
import styled from "styled-components";
import FormInput from "../ui/FormInput";
import useInput from "../../hooks/use-input";

const StyledForm = styled.form`
    margin: 1rem 0;
    padding: 1rem;
    height: 15rem;
    overflow: auto;

    .error-text {
        color: #b40e0e;
    }
`;

const ModalAction = styled.div`
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;

    button {
        font: inherit;
        color: #5a1a01;
        cursor: pointer;
        background-color: transparent;
        border: none;
        border-radius: 25px;
        padding: 0.5rem 2rem;

        &:hover,
        &:active {
            background-color: #ffe6dc;
        }
    }

    .submit {
        border: 1px solid #5a1a01;
        background-color: #5a1a01;
        color: white;

        &:hover,
        &:active {
            background-color: #7a2706;
        }

        :disabled {
            background-color: #ccc;
            color: #292929;
            border-color: #ccc;
            cursor: not-allowed;
        }
    }
`;

const isNotEmpty = (value) => value.trim() !== "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
    const {
        value: name,
        isValid: nameIsValid,
        hasError: nameHasError,
        valueChangeHandler: nameChangeHandler,
        valueBlurHandler: nameBlurHandler,
        reset: resetName,
    } = useInput(isNotEmpty);

    const {
        value: street,
        isValid: streetIsValid,
        hasError: streetHasError,
        valueChangeHandler: streetChangeHandler,
        valueBlurHandler: streetBlurHandler,
        reset: resetStreet,
    } = useInput(isNotEmpty);

    const {
        value: postal,
        isValid: postalIsValid,
        hasError: postalHasError,
        valueChangeHandler: postalChangeHandler,
        valueBlurHandler: postalBlurHandler,
        reset: resetPostal,
    } = useInput(isFiveChars);

    const {
        value: city,
        isValid: cityIsValid,
        hasError: cityHasError,
        valueChangeHandler: cityChangeHandler,
        valueBlurHandler: cityBlurHandler,
        reset: resetCity,
    } = useInput(isNotEmpty);

    let formIsValid = false;
    if (nameIsValid && streetIsValid && postalIsValid && cityIsValid)
        formIsValid = true;

    const confirmHandler = (event) => {
        event.preventDefault();

        if (!formIsValid) {
            return;
        }

        props.onConfirm({ name, street, postal, city });

        resetName();
        resetStreet();
        resetPostal();
        resetCity();
    };

    return (
        <StyledForm onSubmit={confirmHandler}>
            <FormInput
                label="Your Name"
                invalid={nameHasError}
                input={{
                    id: "name",
                    type: "text",
                    placeholder: "e.g. Mr. Handsome",
                    value: name,
                    onChange: nameChangeHandler,
                    onBlur: nameBlurHandler,
                }}
            />
            {nameHasError && (
                <p className="error-text">Name must not be empty.</p>
            )}

            <FormInput
                label="Street"
                invalid={streetHasError}
                input={{
                    id: "street",
                    type: "text",
                    placeholder: "e.g. Frying Pan Road",
                    value: street,
                    onChange: streetChangeHandler,
                    onBlur: streetBlurHandler,
                }}
            />
            {streetHasError && (
                <p className="error-text">Street must not be empty.</p>
            )}

            <FormInput
                label="Postal Code"
                invalid={postalHasError}
                input={{
                    id: "postal",
                    type: "text",
                    value: postal,
                    minLength: 5,
                    maxLength: 5,
                    placeholder: "e.g. 12345",
                    onChange: postalChangeHandler,
                    onBlur: postalBlurHandler,
                }}
            />
            {postalHasError && (
                <p className="error-text">
                    Please enter a valid postal code (5 characters long).
                </p>
            )}

            <FormInput
                label="City"
                invalid={cityHasError}
                input={{
                    id: "city",
                    type: "text",
                    value: city,
                    placeholder: "e.g. Queensland, Australia",
                    onChange: cityChangeHandler,
                    onBlur: cityBlurHandler,
                }}
            />
            {cityHasError && (
                <p className="error-text">City must not be empty.</p>
            )}
            <ModalAction>
                <button type="button" onClick={props.onCancel}>
                    Cancel
                </button>
                <button className="submit" disabled={!formIsValid}>
                    Confirm
                </button>
            </ModalAction>
        </StyledForm>
    );
};

export default Checkout;
