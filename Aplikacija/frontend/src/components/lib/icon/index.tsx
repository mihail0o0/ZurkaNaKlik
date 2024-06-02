import React from "react";

type Props = {
  icon?: string;
  iconMargin?: string;
  fontSize?: string;
  onClick?: () => void;
  enabled?: boolean;
  classes?: string;
  enabledCursor?:boolean;
  cursor?: boolean;
};

const Icon = ({
  icon,
  onClick,
  fontSize,
  iconMargin,
  classes = "cursorDefault",
  enabled = true,
  enabledCursor,
  cursor,
}: Props) => {
  const iconStyle = {
    display: "block",
    fontSize: fontSize ?? "28px",
    marginRight: iconMargin ?? "8px",
    cursor: typeof cursor === "string" ? cursor : enabledCursor ? "pointer" : "default",
  };

  if (!icon) return <></>;

  return (
    <>
      {enabled && (
        <i
          onClick={onClick}
          style={iconStyle}
          className={`material-icons ${classes ?? ""}`}
        >
          {icon}
        </i>
      )}
    </>
  );
};

export default Icon;
