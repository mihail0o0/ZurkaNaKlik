import React from "react";

type Props = {
  icon: string;
  iconMargin?: string;
};

const Icon = ({ icon, iconMargin }: Props) => {
  const iconStyle = {
    fontSize: "28px",
    marginRight: iconMargin ?? "8px",
  };

  return (
    <i style={iconStyle} className="material-icons">
      {icon}
    </i>
  );
};

export default Icon;
