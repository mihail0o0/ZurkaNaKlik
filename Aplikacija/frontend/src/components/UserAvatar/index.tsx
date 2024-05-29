import { Avatar } from "@mui/material";

type Props = {
  src?: string;
  letter?: string;
  size?: number;
  color?: string;
  bgColor?: string;
};

const UserAvatar = ({ src, letter, size, color, bgColor }: Props) => {
  
  if (!letter){
    letter = 'a';
  }

  bgColor ??= avatarColors[letter.charCodeAt(0) % avatarColors?.length];

  return (
    <Avatar
      src={src}
      sx={{ width: size, height: size, color: color, backgroundColor: bgColor }}
    >
      {letter}
    </Avatar>
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

export default UserAvatar;
