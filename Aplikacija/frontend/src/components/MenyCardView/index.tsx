import { OglasObjekata } from "@/store/api/endpoints/oglas/types";
import style from "./style.module.css";
import DisplayCard from "../DisplayCard";
import MojButton from "../lib/button";
import Icon from "../lib/icon";
import { useGetMenuesQuery } from "@/store/api/endpoints/agencija";
import { useGetImageQuery } from "@/store/api/endpoints/images";
import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import {
  useGetReservedOglasiQuery,
  useGetUserDataQuery,
} from "@/store/api/endpoints/korisnik";
import { selectUser } from "@/store/auth";
import { useSelector } from "react-redux";
import { Role } from "@/models/role";
import { getRawLocation } from "@/utils/handleQueries";
import {
  useGetOglasQuery,
  useLazyGetOglasQuery,
} from "@/store/api/endpoints/oglas";
import { format } from "date-fns";
import Input from "../lib/inputs/text-input";

type SelectOglas = {
  text: string;
  date: Date;
  value: number;
};

type MenyCardProps = {
  meni: Menu;
};

const MenyCardView = ({ meni }: MenyCardProps) => {
  const user = useSelector(selectUser);
  const [open, setOpen] = useState(false);

  const { data: userInfo } = useGetUserDataQuery(user?.id ?? skipToken, {
    skip: !user || user.role == Role.AGENCIJA,
  });

  const { data: reservedOglasi } = useGetReservedOglasiQuery(undefined, {
    skip: !user || user.role == Role.AGENCIJA,
  });

  console.log(reservedOglasi);

  const { data: image } = useGetImageQuery(
    getRawLocation(meni.slika) ?? skipToken
  );
  const defaultImage = "/images/imageNotFound.jpg";

  const displayImage = `${image ?? defaultImage}`;

  const [getOglasAction] = useLazyGetOglasQuery();

  const [selectOglasOptions, setSelectOglasOptions] = useState<SelectOglas[]>(
    []
  );

  const [selectedOglas, setSelectedOglas] = useState<number | null>(null);
  const [amount, selectedAmount] = useState("");

  const handleSelectOglas = (event: SelectChangeEvent) => {
    setSelectedOglas(parseInt(event.target.value));
  };

  useEffect(() => {
    const oglasOptions: SelectOglas[] = [];
    if (!reservedOglasi) return;

    reservedOglasi.forEach(async (oglas) => {
      if (!oglas.oglasId) return;

      const { data: oglasData } = await getOglasAction(oglas.oglasId);
      if (!oglasData) return;
      oglasOptions.push({
        text: oglasData.naziv,
        date: new Date(oglas.zakupljenOd),
        value: oglas.id,
      });
    });

    setSelectOglasOptions(oglasOptions);
  }, [reservedOglasi]);

  const handleClick = () => {
    if (!user || user?.role == Role.AGENCIJA) return;
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedOglas(null);
    setOpen(false);
  };

  return (
    <>
      <div className={`${style.Container} cursorPointer`} onClick={handleClick}>
        <div className={style.MenyPicture}>
          <img className={style.picture} src={displayImage} />
        </div>
        <div className={style.MenyTxt}>
          <h2>{meni.naziv}</h2>
          <Typography
            textOverflow={"ellipsis"}
            overflow={"hidden"}
            maxWidth={"100%"}
            height={"75px"}
          >
            {meni.opis}
          </Typography>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Zakupite ovaj meni</DialogTitle>
        <DialogContent>
          <div className={style.dialogContainer}>
            <h3>{meni.naziv}</h3>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="Select-Vikendica">Odaberite oglas</InputLabel>
              <Select
                value={selectedOglas != null ? String(selectedOglas) : ""}
                onChange={handleSelectOglas}
                labelId="Select-Vikendica"
                label="Mjau"
              >
                {selectOglasOptions.map((oglasOption, index) => {
                  return (
                    <MenuItem value={index}>
                      <div className={style.selectOglasOption}>
                        <p>{oglasOption.text}</p>
                        <p>{format(oglasOption.date, "d. M. yyyy.")}</p>
                      </div>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <Input icon="scale" text={amount} onChange={selectedAmount} placeholder="Količina" />
            </FormControl>
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
