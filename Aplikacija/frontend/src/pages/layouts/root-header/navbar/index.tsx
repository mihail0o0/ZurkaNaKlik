import LabeledAvatar from "@/components/LabeledAvatar";
import { Popover, Typography } from "@mui/material";
import { useState } from "react";
import style from "./style.module.css";
import Icon from "@/components/lib/icon";
import { NavLink } from "react-router-dom";
import { User } from "@/models/user";

type Props = {
  user: User;
};

const Navbar = ({ user }: Props) => {
  const [anchor, setAnchor] = useState<HTMLDivElement | null>();
  const [open, setOpen] = useState(false);

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchor(event.currentTarget);
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <div>
      <div onClick={onClick}>
        <LabeledAvatar classes="cursorPointer" heading text={user.name} />
      </div>
      <Popover
        anchorEl={anchor}
        open={open}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        // TODO stavi ovo u defaultni stilovi
        sx={{
          "& .css-3bmhjh-MuiPaper-root-MuiPopover-paper": {
            borderRadius: "30px",
          },
        }}
        onClose={() => setOpen(false)}
      >
        <div className={style.popoverContent}>
          {texts.map((text, index) => (
            <NavLink
              key={text}
              style={{ textDecoration: "none", color: "black" }}
              to={links[index]}
              onClick={() => setOpen(false)}
            >
              <div className={style.popoverItem}>
                <Icon classes="pointer" icon={icons[index]} />
                <Typography>{text}</Typography>
              </div>
            </NavLink>
          ))}
        </div>
      </Popover>
    </div>
  );
};

const icons = [
  "account_circle",
  "forum",
  "favorite",
  "schedule",
  "add",
  "logout",
];

const texts = [
  "Profil",
  "Čet",
  "Omiljeno",
  "Već posećeno",
  "Oglasi prostor",
  "Odjavi se",
];

const links = [
  "/profile",
  "/chat",
  "/omiljeno",
  "/poseceno",
  "/prostor/oglasiProstor",
  "/logout",
];

export default Navbar;
