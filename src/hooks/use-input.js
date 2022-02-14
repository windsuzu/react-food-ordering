import { useReducer } from "react";

const initInputState = {
    value: "",
    isTouched: false,
};

const inputReducer = (state, action) => {
    switch (action.type) {
        case "INPUT":
            return { value: action.value, isTouched: state.isTouched };
        case "BLUR":
            return { value: state.value, isTouched: true };
        case "RESET":
            return { value: "", isTouched: false };
        default:
            return initInputState;
    }
};

const useInput = (validateFn) => {
    const [state, dispatch] = useReducer(inputReducer, initInputState);

    const isValid = validateFn(state.value);
    const hasError = state.isTouched && !isValid;

    const valueChangeHandler = (e) =>
        dispatch({ type: "INPUT", value: e.target.value });

    const valueBlurHandler = (e) => dispatch({ type: "BLUR" });

    const reset = () => dispatch({ type: "RESET" });

    return {
        value: state.value,
        isValid,
        hasError,
        valueChangeHandler,
        valueBlurHandler,
        reset,
    };
};

export default useInput;
