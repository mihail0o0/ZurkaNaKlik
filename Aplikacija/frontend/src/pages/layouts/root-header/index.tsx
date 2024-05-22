import { NavLink, Outlet } from "react-router-dom";
import style from "./style.module.css";
import { useSelector } from "react-redux";
import { selectAuthToken, selectUser } from "@/store/auth";
import LabeledAvatar from "@/components/LabeledAvatar";
import { Dialog, DialogTitle, Popover, Typography } from "@mui/material";
import { useState } from "react";
import MojButton from "@/components/lib/button";
import Icon from "@/components/lib/icon";
import { link } from "joi";

const RootHeader = () => {
  const [anchor, setAnchor] = useState<HTMLDivElement | null>();
  const [open, setOpen] = useState(false);
  const user = useSelector(selectUser);

  // const onOpen = () => {
  //   setOpen(true);
  // };

  // const onClose = () => {
  //   setOpen(false);
  // }

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchor(event.currentTarget);
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <>
      <header className={style.AppHeader}>
        <nav>
          <NavLink to="/" className={style.ZurkaNaKlik}>
            ZurkaNaKlik
          </NavLink>

          {user && (
            <div>
              <div onClick={onClick}>
                <LabeledAvatar heading text={user.name} />
              </div>
              <Popover
                anchorEl={anchor}
                open={open}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
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
                      style={{ textDecoration: "none", color: "black" }}
                      to={links[index]}
                    >
                      <div className={style.popoverItem}>
                        <Icon classes="pointer" icon={icons[index]} />
                        <Typography>{text}</Typography>
                      </div>
                    </NavLink>
                  ))}
                </div>
              </Popover>

              {/* <Dialog open={open} onClose={() => setOpen(false)}>
                <p>Radi</p>
              </Dialog> */}
            </div>
          )}
          {!user && (
            <NavLink to="/Login" className={style.LoginButtonHeader}>
              Prijava
            </NavLink>
          )}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
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

export default RootHeader;
