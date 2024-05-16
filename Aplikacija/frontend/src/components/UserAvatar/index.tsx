import { Avatar } from "@mui/material";

type Props = {
  src?: string;
  letter?: string;
  size?: number;
  color?: string;
  bgColor?: string;
};

const UserAvatar = ({ src, letter, size, color, bgColor }: Props) => {
  return (
    <Avatar
      src={src}
      sx={{ width: size, height: size, color: color, bgColor: bgColor }}
    >
      {letter}
    </Avatar>
  );
};

export default UserAvatar;
