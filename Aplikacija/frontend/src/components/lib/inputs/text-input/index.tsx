import Icon from "@/components/lib/icon";
import { useRef, useState } from "react";

type Props = {
  text: string;
  icon?: string;
  suffixIcon?: boolean;
  onChange: (arg0: string) => void;
  error?: string | null;
};

const Input = ({ icon, text, suffixIcon, onChange, error }: Props) => {
  const divRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [visibilityIcon, setVisibilityIcon] = useState("visibility_off");

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const changeVisibilityIcon = () => {
    visibilityIcon === "visibility"
      ? setVisibilityIcon("visibility_off")
      : setVisibilityIcon("visibility");
  };

  const handleFocusChange = () => {
    if (!divRef || !divRef.current) return;
    divRef.current.classList.add("inputWrapperFocused");
  };

  const handleBlurChange = () => {
    if (!divRef || !divRef.current) return;
    divRef.current.classList.remove("inputWrapperFocused");
  };

  return (
    <div className="imputErrorWrapper">
      <div ref={divRef} className="inputWrapper">
        <div className="formTextIconContainer">
          <Icon icon={icon} />

          <input
            ref={inputRef}
            type={
              suffixIcon && visibilityIcon === "visibility_off"
                ? "password"
                : "text"
            }
            className="formTextInput"
            placeholder={text}
            onFocus={handleFocusChange}
            onBlur={handleBlurChange}
            onChange={handleTextChange}
          />
        </div>

        <Icon
          icon={visibilityIcon}
          onClick={changeVisibilityIcon}
          classes="hoverPointer"
          disabled={suffixIcon ? true : false}
        />
      </div>

      {error && <p className="inputError">{error}</p>}
    </div>
  );
};

export default Input;
