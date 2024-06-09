import { ReservedOglas } from "@/store/api/endpoints/korisnik/types";
import style from "./style.module.css";
import MojButton from "@/components/lib/button";
import { useGetAgencyDataQuery } from "@/store/api/endpoints/agencija";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetImageQuery } from "@/store/api/endpoints/images";
import { getRawLocation } from "@/utils/handleQueries";
import { useGetOglasQuery } from "@/store/api/endpoints/oglas";
import { format } from "date-fns";
import UserAvatar from "@/components/UserAvatar";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Rating,
} from "@mui/material";

type Props = {
  reservedOglas: ReservedOglas;
};

const ReservedOglasCard = ({ reservedOglas }: Props) => {
  const [openDialogOtkaziKetering, setOpenDialogOtkaziKetering] =
    useState(false);
  const [openOceniOglas, setOpenOceniOglas] = useState(false);
  const [valueOglasOcena, setValueOglasOcena] = useState<number | null>(2);
  const [openDialogOtkaziRezervaciju, setOpenDialogOtkaziRezervaciju] =
    useState(false);
  const [openOceniAgenciju, setOpenOceniAgenciju] = useState(false);
  const [valueAgencijaOcena, setValueAgencijaOcena] = useState<number | null>(
    2
  );
  const defaultImage = "/images/imageNotFound.jpg";
  const navigate = useNavigate();
  const { data: agency } = useGetAgencyDataQuery(
    reservedOglas.idAgencije || skipToken
  );
  const { data: oglas } = useGetOglasQuery(reservedOglas.oglasId ?? skipToken);

  const { data: agencyImage } = useGetImageQuery(
    getRawLocation(agency?.slikaProfila) ?? skipToken
  );

  const { data: oglasImage } = useGetImageQuery(
    getRawLocation(oglas?.slike[0]) ?? skipToken
  );

  const oglasDisplayImage = oglasImage ?? defaultImage;

  const statusKeteringa: string = useMemo(() => {
    if (reservedOglas.statusZahtevaZaKetering == undefined) return "Na čekanju";
    if (reservedOglas.statusZahtevaZaKetering) return "Potvrđeno";
    return "Odbijeno";
  }, [reservedOglas]);

  const totalPrice = useMemo(() => {
    let price = 0;
    if (reservedOglas.cenaKeteringa) price += reservedOglas.cenaKeteringa;
    if (reservedOglas.cenaOglasa) price += reservedOglas.cenaOglasa;
    return price;
  }, [reservedOglas]);

  if (!oglas) {
    return;
  }
  const handleClickOpenOceniOglas = () => {
    setOpenOceniOglas(true);
  };

  const handleCloseOceniOglas = () => {
    setOpenOceniOglas(false);
  };
  const handleOtkaziKetering = () => {
    setOpenDialogOtkaziKetering(true);
  };
  const handleClickOpenOceniAgenciju = () => {
    setOpenOceniAgenciju(true);
  };

  const handleCloseOceniAgenciju = () => {
    setOpenOceniAgenciju(false);
  };
  const handleDialogCloseKetering = async (agree: boolean) => {
    setOpenDialogOtkaziKetering(false);

    if (agree) {
      // if ("error" in response) {
      //   navigate(`/history`);
      //   return;
      // }
      // toast.success("Uspesno otkazan ketering");
    }
  };
  const handleOtkaziRezervaciju = () => {
    setOpenDialogOtkaziRezervaciju(true);
  };

  const handleDialogCloseRezervacija = async (agree: boolean) => {
    setOpenDialogOtkaziRezervaciju(false);

    if (agree) {
      // if ("error" in response) {
      //   navigate(`/history`);
      //   return;
      // }
      // toast.success("Uspesno otkazan ketering");
    }
  };
  return (
    <>
      <div className={style.Wrapper}>
        <div className={`${style.Container} bs`}>
          <div className={style.contentWrapper}>
            <div className={style.agencyOglasContainer}>
              <div className={style.oglas}>
                <img src={oglasDisplayImage} />
                <h3>{oglas.naziv}</h3>
              </div>
              <div className={style.agency}>
                {agency && (
                  <div className={style.avatarContainer}>
                    <UserAvatar
                      size={100}
                      src={agencyImage}
                      letter={agency?.ime}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className={style.bottomText}>
              <p>
                {format(reservedOglas.zakupljenOd, "LLL d, yyy")} {" - "}
                {format(reservedOglas.zakupljenDo, "LLL d, yyy")}
              </p>
            </div>
          </div>
          <div className={style.right}>
            {agency && (
              <div className={style.status}>
                <p>Status Keteringa:</p>
                <p>{statusKeteringa}</p>
              </div>
            )}
            <div className={style.total}>
              <p>Prostor: {reservedOglas.cenaOglasa} din</p>
              <p>Ketering: {reservedOglas.cenaKeteringa} din</p>
              <p>Ukupno: {totalPrice} din</p>
            </div>
          </div>
        </div>
        <div className={style.Actions}>
          <MojButton
            icon="star"
            color="white"
            text="Oceni oglas"
            onClick={handleClickOpenOceniOglas}
            small={true}
            backgroundColor="var(--golden)"
          />
          <MojButton
            icon="star"
            color="white"
            text="Oceni agenciju"
            onClick={handleClickOpenOceniAgenciju}
            small={true}
            backgroundColor="var(--golden)"
          />
          {!agency && (
            <MojButton
              icon="add"
              color="white"
              text="Dodaj ketering"
              onClick={() => navigate(`/findCatering`)}
              small={true}
              backgroundColor="var(--green)"
            />
          )}
          {agency && (
            <MojButton
              icon="cancel"
              color="white"
              text="Otkaži ketering"
              onClick={handleOtkaziKetering}
              small={true}
              backgroundColor="var(--delete)"
            />
          )}
          <MojButton
            icon="delete"
            color="white"
            text="Otkaži rezervaciju"
            onClick={handleOtkaziRezervaciju}
            small={true}
            backgroundColor="var(--delete)"
          />
        </div>
      </div>
      <Dialog
        open={openDialogOtkaziKetering}
        onClose={() => handleDialogCloseKetering(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Da li ste sigurni da želite da otkažete ketering?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ukolko otkažete ketering moguće je da isti više nećete moći da
            poručite.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogCloseKetering(false)}>Ne</Button>
          <Button onClick={() => handleDialogCloseKetering(true)} autoFocus>
            Da
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDialogOtkaziRezervaciju}
        onClose={() => handleDialogCloseRezervacija(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Da li ste sigurni da želite da otkažete rezervaciju?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={() => handleDialogCloseRezervacija(false)}>
            Ne
          </Button>
          <Button onClick={() => handleDialogCloseRezervacija(true)} autoFocus>
            Da
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openOceniOglas}
        onClose={handleCloseOceniOglas}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Ocenite oglas"}</DialogTitle>
        <DialogContent>
          <Box sx={{ "& > legend": { mt: 2 } }}>
            <Rating
              name="simple-controlled"
              value={valueOglasOcena}
              onChange={(event, newValue) => {
                setValueOglasOcena(newValue);
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseOceniOglas}>Cancel</Button>
          <Button onClick={handleCloseOceniOglas} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openOceniAgenciju}
        onClose={handleCloseOceniAgenciju}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Ocenite agenciju"}</DialogTitle>
        <DialogContent>
          <Box sx={{ "& > legend": { mt: 2 } }}>
            <Rating
              name="simple-controlled"
              value={valueAgencijaOcena}
              onChange={(event, newValue) => {
                setValueAgencijaOcena(newValue);
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseOceniAgenciju}>Cancel</Button>
          <Button onClick={handleCloseOceniAgenciju} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReservedOglasCard;
