import UserAvatar from "../UserAvatar";
import style from "./styles.module.css";

type Props = {
  text: string;
  avatarSize?: number;
  src?: string;
  fontSize?: number;
  color?: string;
  bgColor?: string;
  heading?: boolean;
  onClick?: () => void;
  classes?: string;
};

const LabeledAvatar = ({
  text,
  src,
  avatarSize,
  fontSize,
  color,
  bgColor,
  heading,
  onClick,
  classes,
}: Props) => {
  const avatarStyle = {
    fontFamily: heading ? "Poppins" : undefined,
    fontSize: fontSize ? `${fontSize}px` : undefined,
    fontWeight: heading ? 500 : undefined,
  };

  bgColor ??= avatarColors[text.charCodeAt(0) % avatarColors?.length];

  return (
    <div
      onClick={onClick}
      className={`${style.container} ${onClick ? "cursorPointer" : ""} ${
        classes ?? ""
      }`}
    >
      <p style={avatarStyle}>{text}</p>
      <UserAvatar
        src={src}
        size={avatarSize}
        letter={text[0]}
        color={color}
        bgColor={bgColor}
      />
    </div>
  );
};

const avatarColors = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#00FFFF",
  "#FF00FF",
  "#FFA500",
  "#800080",
  "#00FF00",
  "#FFC0CB",
  "#008080",
  "#E6E6FA",
  "#A52A2A",
  "#F5F5DC",
  "#800000",
  "#98FF98",
  "#808000",
  "#FF7F50",
  "#000080",
  "#808080",
  "#C0C0C0",
  "#FFD700",
  "#FFFFF0",
  "#40E0D0",
  "#EE82EE",
  "#4B0082",
  "#DC143C",
  "#FA8072",
  "#F0E68C",
  "#DDA0DD",
];

export default LabeledAvatar;
