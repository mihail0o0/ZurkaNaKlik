import React from "react";

type Props = {
  icon?: string;
  iconMargin?: string;
  fontSize?: string;
  onClick?: () => void;
  disabled?: boolean;
  classes?: string;
};

const Icon = ({
  icon,
  onClick,
  fontSize,
  iconMargin,
  classes,
  disabled,
}: Props) => {
  const iconStyle = {
    display: "block",
    fontSize: fontSize ?? "28px",
    marginRight: iconMargin ?? "8px",
  };

  if (!icon) return <></>;

  return (
    <>
      {!disabled && (
        <i
          onClick={onClick}
          style={iconStyle}
          className={`material-icons ${classes ?? ""}}`}
        >
          {icon}
        </i>
      )}
    </>
  );
};

export default Icon;
