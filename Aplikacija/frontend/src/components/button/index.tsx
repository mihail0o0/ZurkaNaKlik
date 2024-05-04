import React, { CSSProperties } from "react";
import Icon from "../icon";

type Props = {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement> | (() => void);
  grey?: boolean;
  icon?: string;
  wide: boolean;
  center: boolean;
  paddingX?: string;
  paddingY?: string;
  iconMargin?: string;
};

const Button = ({
  text,
  onClick,
  grey,
  icon,
  wide,
  center,
  paddingX,
  paddingY,
  iconMargin,
}: Props) => {
  const buttonStyle: CSSProperties = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: center ? "center" : "flex-start",
    paddingTop: paddingY ?? "20px",
    paddingBottom: paddingY ?? "20px",
    paddingLeft: paddingX ?? "28px",
    paddingRight: paddingX ?? "28px",
    border: "none",
    borderRadius: "var(--borderRadiusMedium)",
    backgroundColor: grey ? "var(--lightGrey)" : "var(--mainColor)",
    color: grey ? "black" : "white",
    fontSize: "19px",
    fontWeight: "500",
    width: wide ? "100%" : "fit-content",
    transition: "150ms all",
  };

  const textStyle = {
    marginLeft: "auto",
    marginRight: "auto",
  };

  return icon ? (
    <button className="mainButton" style={buttonStyle} onClick={onClick}>
      <Icon iconMargin={iconMargin} icon={icon} />
      <span style={textStyle}>{text}</span>
    </button>
  ) : (
    <button className="mainButton" style={buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
