import { useRef, useState } from "react";

function FormInput({ icon, text, suffixIcon, hidden, onInputChange }) {
    const divRef = useRef(null);
    const [visibilityIcon, setVisibilityIcon] = useState("visibility_off");

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
        <div ref={divRef} className="inputWrapper">
            <div className="formTextIconContainer">
                {icon && <i style={iconStyle} className="material-icons">{icon}</i>}
                <input
                    type={(suffixIcon && visibilityIcon === "visibility_off") ? "password" : "text"}
                    className="formTextInput"
                    placeholder={text}
                    onFocus={handleFocusChange}
                    onBlur={handleBlurChange}
                />
            </div>
            {suffixIcon && <i onClick={changeVisibilityIcon} className="material-icons hoverPointer">{visibilityIcon}</i>}
        </div>
    );
}

export default FormInput;