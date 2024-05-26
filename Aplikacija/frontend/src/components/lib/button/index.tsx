import React, { CSSProperties } from "react";
import Icon from "../icon";

type Props = {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement> | (() => void);
  grey?: boolean;
  icon?: string;
  wide?: boolean;
  center?: boolean;
  paddingX?: string;
  paddingY?: string;
  iconMargin?: string;
  color?: string;
  backgroundColor?: string;
  classes?: string;
  fontSize?:string;
  small?: boolean;
};

const MojButton = ({
  text,
  onClick,
  grey,
  icon,
  wide,
  center,
  paddingX,
  paddingY,
  iconMargin,
  color,
  backgroundColor,
  classes,
  fontSize,
  small,
}: Props) => {
  color ??= grey ? "black" : "white";
  backgroundColor ??= grey ?"var(--lightGrey)" : "var(--mainColor)"; 
  
  const buttonStyle: CSSProperties = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: center ? "center" : "flex-start",
    paddingTop: paddingY ?? small ? "12px" : "20px",
    paddingBottom: paddingY ?? small ? "12px" : "20px",
    paddingLeft: paddingX ?? small ? "14px" : "28px",
    paddingRight: paddingX ?? small ? "14px" : "28px",
    border: "none",
    borderRadius: small ? "var(--borderRadiusSmall)" : "var(--borderRadiusMedium)",
    backgroundColor: backgroundColor,
    color: color,
    fontSize:  fontSize ?? "18px",
    fontWeight: "500",
    width: wide ? "100%" : "fit-content",
    transition: "150ms all",
  };

  const textStyle = {
    marginLeft: "auto",
    marginRight: "auto",
  };

  return icon ? (
    <button className={`mainButton ${classes}`} style={buttonStyle} onClick={onClick}>
      <Icon iconMargin={iconMargin} icon={icon} />
      <span style={textStyle}>{text}</span>
    </button>
  ) : (
    <button className="mainButton" style={buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
};

export default MojButton;
