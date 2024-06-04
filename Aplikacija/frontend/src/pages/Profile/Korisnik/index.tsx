import Input from "@/components/lib/inputs/text-input";
import style from "./style.module.css";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import MojButton from "@/components/lib/button";
import LabeledAvatar from "@/components/LabeledAvatar";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/auth";
import OglasKartica from "@/components/OglasKartica";
import { useDeleteUserMutation, useGetUserDataQuery } from "@/store/api/endpoints/korisnik";
import UserAvatar from "@/components/UserAvatar";
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  BrowserRouter,
  useParams,
} from "react-router-dom";

import { Alert } from "@mui/material";
import {
  useGetKorisnikOglasiQuery,
  useGetUserOglasiQuery,
} from "@/store/api/endpoints/oglas";
import { EnumTipProslava } from "@/store/api/endpoints/oglas/types";
import { skipToken } from "@reduxjs/toolkit/query";
import Icon from "@/components/lib/icon";
import DisplayCard from "@/components/DisplayCard";
import { toast } from "react-toastify";



const UserProfile = () => {
  const navigate = useNavigate();
  const userCurr = useSelector(selectUser);
  const { id } = useParams();
  const idKorisnika = id ? parseInt(id) : undefined;
  //znaci ovo je ako nisu isti
  const { data: vlasnikOglasa } = useGetUserDataQuery(idKorisnika ?? skipToken);
  const flag = idKorisnika === userCurr?.id;
  const { data: tudjiOglasi } = useGetKorisnikOglasiQuery(
    idKorisnika ?? skipToken
  );
 

  // nece da se pozove ako ne postoji user, zbog skip
  const { data: user } = useGetUserDataQuery(userCurr?.id!, {
    skip: !userCurr,
  });
  const { data: MojiOglasi } = useGetUserOglasiQuery();

  console.log(user);
  console.log(tudjiOglasi);

  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [brTel, setBrTel] = useState("");
  const [slikaProfila, setSlikaProfila] = useState<string | undefined>("");
  const [lokacija, setLokacija] = useState("");
  const [opis, setOpis] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const[deleteUser]=useDeleteUserMutation();

  useEffect(() => {
    if (!vlasnikOglasa) return;

    setIme(vlasnikOglasa.name);
    setPrezime(vlasnikOglasa.lastName);
    setBrTel(vlasnikOglasa.phoneNumber);
    setSlikaProfila(vlasnikOglasa.profilePhoto);
    setLokacija(vlasnikOglasa.location);
  }, [user]);

  function handleOpis(event: ChangeEvent<HTMLTextAreaElement>) {
    setOpis(event.target.value);
  }
  const handleDelete = () => {
    setOpenDialog(true); 
  };

  const handleDialogClose = async (agree: boolean) => {
    setOpenDialog(false); 

    if (agree) {
       if (!userCurr) return;
    const response = await deleteUser(userCurr.id);

    if ("error" in response) {
      toast.error("Neuspesno brisanje naloga");
      navigate(`/user/profile/${userCurr.id}`);
      return;
    }

    toast.success("Uspesno obrisan nalog");
    navigate("user/signup");
     
    }
  };
  if (!user) {
    return null;
  }

  return (
    <div className={`containerWrapper ${style.Container}`}>
      <div className={style.PostavkeProfila}>
        <div>{flag && <h2>Postavke profila</h2>}</div>
        <div className={style.Postavke2}>
          {/* odje ide slika od kad je clan broj oglasa i prosecna ocena */}
          <div className={style.KarticaSaSlikom}>
            <div className={style.SlikaImeIPrezime}>
              <UserAvatar size={100} letter={user.name[0]} src={slikaProfila} />

              <p>
                {vlasnikOglasa && vlasnikOglasa.name}{" "}
                {vlasnikOglasa && vlasnikOglasa.lastName}
              </p>
              <div className={style.obrrrisibhrate}>
              <div className={style.DeleteIcon} onClick={handleDelete}>
                <Icon
                  icon="delete"
                  classes={"cursorPointer"}
                  iconMargin="0px"
                />
                </div>
                <label>Izbrisi nalog</label>
              </div>
            </div>
            {/* <div className={style.InfoOClanu}>
              {flag && <p>Email: {vlasnikOglasa && vlasnikOglasa.email}</p>}
             {flag && <p>Broj telefona: {vlasnikOglasa && vlasnikOglasa.phoneNumber}</p>}
             {flag &&<p>{vlasnikOglasa && vlasnikOglasa.location}</p>}
            </div> */}
          </div>
          <div className={style.OsnovnePostavkeProfila}>
            <div className={style.PostavkeProfilaTXT}>
              {flag ? (
                <h2>Osnovne postavke profila</h2>
              ) : (
                <h2>Osnovne informacije profila</h2>
              )}
            </div>
            <div className={style.Inputi}>
              <div className={style.Red}>
                {flag ? (
                  <Input
                    disabled={!flag}
                    text={ime}
                    placeholder="Ime"
                    icon="boy"
                    onChange={setIme}
                  />
                ) : (
                  <DisplayCard
                    icon={"boy"}
                    text={
                      (vlasnikOglasa &&
                        vlasnikOglasa.name + " " + vlasnikOglasa?.lastName) ||
                      ""
                    }
                  />
                )}
                {flag ? (
                  <Input
                    disabled={!flag}
                    text={lokacija}
                    placeholder="Grad"
                    icon="location_on"
                    onChange={setLokacija}
                  />
                ) : (
                  <DisplayCard
                    icon={"location_on"}
                    text={(vlasnikOglasa && vlasnikOglasa.location) || ""}
                  />
                )}
              </div>
              <div className={style.Red}>
                {flag ? (
                  <Input
                    disabled
                    text={(vlasnikOglasa && vlasnikOglasa.email) || ""}
                    placeholder="Email"
                    icon="mail"
                    onChange={() => {}}
                  />
                ) : (
                  <DisplayCard
                    icon={"mail"}
                    text={(vlasnikOglasa && vlasnikOglasa.email) || ""}
                  />
                )}
                {flag ? (
                  <Input
                    disabled={!flag}
                    text={brTel}
                    icon="call"
                    onChange={setBrTel}
                  />
                ) : (
                  <DisplayCard
                    icon={"call"}
                    text={(vlasnikOglasa && vlasnikOglasa.phoneNumber) || ""}
                  />
                )}
              </div>
            </div>

            <div className={style.TekstArea}>
              <textarea
                disabled={!flag}
                placeholder={flag ? "Recite nesto vise o sebi" : ""}
                className={style.TxtArea}
                onChange={handleOpis}
                value={opis}
              />
            </div>
            <div className={style.Dugmenajjace}>
              <div className={style.Dugme2}>
                {/* da azuriram korisnika */}
                {flag && (
                  <MojButton
                    text="Sacuvaj"
                    onClick={() => {}}
                    wide={true}
                    center={true}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.MojiOglasi}>
        <div>
          {flag ? (
            <h2>Moji oglasi</h2>
          ) : (
            <h2>Oglasi korisnika {vlasnikOglasa?.name}</h2>
          )}
        </div>
        <div className={style.OglasiKartice}>
          {flag
            ? MojiOglasi?.map((oglas) => (
                <div key={oglas.id}>
                  <OglasKartica oglas={oglas} onClick={() => {}} />
                </div>
              ))
            : tudjiOglasi?.map((oglas) => (
                <div key={oglas.id}>
                  <OglasKartica oglas={oglas} onClick={() => {}} />
                </div>
              ))}
        </div>
        <div className={style.Dugmenajjace}>
          <div className={style.Dugme2}>
            {flag && (
              <MojButton
                text="Dodaj oglas"
                onClick={() => {
                  navigate("/prostor/oglasiProstor");
                }}
                wide={true}
                center={true}
              />
            )}
          </div>
        </div>
      </div>
      <Dialog
        open={openDialog}
        onClose={() => handleDialogClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Da li ste sigurni da želite da obrišete nalog?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Brisanje naloga je trajna akcija i ne može se poništiti. Da li ste sigurni da želite da nastavite?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)}>Ne</Button>
          <Button onClick={() => handleDialogClose(true)} autoFocus>
            Da
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    
  );
};
export default UserProfile;
