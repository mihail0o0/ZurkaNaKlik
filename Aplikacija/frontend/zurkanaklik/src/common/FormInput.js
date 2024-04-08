import { useRef, useState } from "react";

function FormInput({ icon, text, suffixIcon, onInputChange = () => { }, error }) {
    const divRef = useRef(null);
    const inputRef = useRef(null);
    const [inputText, setInputText] = useState('');
    const [visibilityIcon, setVisibilityIcon] = useState("visibility_off");

    const handleTextChange = (event) => {
        setInputText(event.target.value);
        onInputChange(event.target.value);
        console.log(error);
    };

    const changeVisibilityIcon = () => {
        (visibilityIcon === "visibility") ? setVisibilityIcon("visibility_off") : setVisibilityIcon("visibility");
    };

    const handleFocusChange = () => {
        divRef.current.classList.add("inputWrapperFocused");
    };

    const handleBlurChange = () => {
        divRef.current.classList.remove("inputWrapperFocused");
    };

    let textStyle = {
        marginLeft: "auto",
        marginRight: "auto"
    };

    let iconStyle = {
        display: "block",
        fontSize: "28px",
        marginRight: "8px"
    };

    return (
        <div className="imputErrorWrapper">
            <div ref={divRef} className="inputWrapper">
                <div className="formTextIconContainer">
                    {icon && <i style={iconStyle} className="material-icons">{icon}</i>}
                    <input
                        ref={inputRef}
                        type={(suffixIcon && visibilityIcon === "visibility_off") ? "password" : "text"}
                        className="formTextInput"
                        placeholder={text}
                        onFocus={handleFocusChange}
                        onBlur={handleBlurChange}
                        onChange={handleTextChange}
                    />
                </div>
                {suffixIcon && <i onClick={changeVisibilityIcon} className="material-icons hoverPointer">{visibilityIcon}</i>}
            </div>
            <p className="inputError">{error}</p>
        </div>
    );
}

export default FormInput;