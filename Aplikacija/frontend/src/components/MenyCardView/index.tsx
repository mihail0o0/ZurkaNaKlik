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
  Typography,
} from "@mui/material";

type MenyCardProps = {
  meni: Menu;
};

const MenyCardView = ({ meni }: MenyCardProps) => {
  const [open, setOpen] = useState(true);

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
          <div className={style.dialogPictureContainer}>
            <img className={style.dialogPicture} src={displayImage} />
          </div>
          <div className={style.nazivOcena}>
            <Typography>{meni.naziv}</Typography>
            <div className={style.ocena}>
              <Icon icon="payments" />
              <p>{meni.cenaMenija}</p>
            </div>
          </div>
          <Typography>{meni.opis}</Typography>
          <DialogActions>
            <MojButton text="Zakazi" small={true} onClick={() => {}} />
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MenyCardView;
