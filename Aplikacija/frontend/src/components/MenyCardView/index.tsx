import { OglasObjekata } from "@/store/api/endpoints/oglas/types";
import style from "./style.module.css";
import DisplayCard from "../DisplayCard";
import MojButton from "../lib/button";
import Icon from "../lib/icon";
import { useGetMenuesQuery } from "@/store/api/endpoints/agencija";
import { useGetImageQuery } from "@/store/api/endpoints/images";
import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useGetUserDataQuery } from "@/store/api/endpoints/korisnik";
import { selectUser } from "@/store/auth";
import { useSelector } from "react-redux";
import { Role } from "@/models/role";

type MenyCardProps = {
  meni: Menu;
};

const MenyCardView = ({ meni }: MenyCardProps) => {
  const user = useSelector(selectUser);
  const [open, setOpen] = useState(false);

  const { data: userInfo } = useGetUserDataQuery(user?.id ?? skipToken, {
    skip: !user || user.role == Role.AGENCIJA,
  });

  const { data: image } = useGetImageQuery(meni.slika ?? skipToken);
  const defaultImage = "/images/imageNotFound.jpg";

  const displayImage = `${image ?? defaultImage}`;

  const handleClick = () => {
    // if()
  };

  return (
    <>
      <div className={`${style.Container} cursorPointer`} onClick={handleClick}>
        <div className={style.MenyPicture}>
          <img className={style.picture} src={displayImage} />
        </div>
        <div className={style.MenyTxt}>
          <h2>{meni.naziv}</h2>
          <Typography textOverflow={"ellipsis"} overflow={"hidden"}>
            {meni.opis}
          </Typography>
        </div>
      </div>
      <Dialog open={open}>
        <DialogTitle>Zakupite ovaj meni</DialogTitle>
        <DialogContent>
          <div className={style.dialogContainer}>
            <h3>{meni.naziv}</h3>
            <Select></Select>
          </div>
          <DialogActions>
            <MojButton text="Zakazi" small={true} onClick={() => {}} />
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MenyCardView;
