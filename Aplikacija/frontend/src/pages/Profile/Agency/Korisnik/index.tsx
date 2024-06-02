import Input from "@/components/lib/inputs/text-input";
import style from "./style.module.css";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import MojButton from "@/components/lib/button";
import LabeledAvatar from "@/components/LabeledAvatar";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/auth";
import OglasKartica from "@/components/OglasKartica";
import { useGetUserDataQuery } from "@/store/api/endpoints/korisnik";
import UserAvatar from "@/components/UserAvatar";
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  BrowserRouter,
} from "react-router-dom";

import { Alert } from "@mui/material";
import { useGetUserOglasiQuery } from "@/store/api/endpoints/oglas";
import { EnumTipProslava } from "@/store/api/endpoints/oglas/types";

const UserProfile = () => {
  const navigate = useNavigate();
  const userCurr = useSelector(selectUser);

  // nece da se pozove ako ne postoji user, zbog skip
  const { data: user } = useGetUserDataQuery(userCurr?.id!, {
    skip: !userCurr,
  });
  const { data: MojiOglasi } = useGetUserOglasiQuery();

  console.log(user);

  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [brTel, setBrTel] = useState("");
  const [slikaProfila, setSlikaProfila] = useState<string | undefined>("");
  const [lokacija, setLokacija] = useState("");
  const [opis, setOpis] = useState("");

  useEffect(() => {
    if (!user) return;

    setIme(user.name);
    setPrezime(user.lastName);
    setBrTel(user.phoneNumber);
    setSlikaProfila(user.profilePhoto);
    setLokacija(user.location);
  }, [user]);

  // const sacuvajIzmene = () => {
  //   const profileData = {
  //     ime,
  //     prezime,
  //     email,
  //     brTel,
  //     slikaProfila,
  //     lokacija,
  //     opis,
  //   };
  //   localStorage.setItem("profileSettings", JSON.stringify(profileData));
  //   return (
  //     <Alert variant="outlined" severity="success">
  //       Promene su uspesno sacuvane!
  //     </Alert>
  //   );
  // };

  function handleOpis(event: ChangeEvent<HTMLTextAreaElement>) {
    setOpis(event.target.value);
  }

  if (!user) {
    return null;
  }

  return (
    <div className={`containerWrapper ${style.Container}`}>
      <div className={style.PostavkeProfila}>
        <div>
          <h2>Postavke profila</h2>
        </div>
        <div className={style.Postavke2}>
          {/* odje ide slika od kad je clan broj oglasa i prosecna ocena */}
          <div className={style.KarticaSaSlikom}>
            <div className={style.SlikaImeIPrezime}>
              <UserAvatar size={100} letter={user.name[0]} src={slikaProfila} />

              <p>
                {user.name} {user.lastName}
              </p>
            </div>
            <div className={style.InfoOClanu}>
              <p>Email: {user.email}</p>
              <p>Broj telefona: {user.phoneNumber}</p>
              <p>{user.location}</p>
            </div>
          </div>
          <div className={style.OsnovnePostavkeProfila}>
            <div className={style.PostavkeProfilaTXT}>
              <h2>Osnovne postavke profila</h2>
            </div>
            <div className={style.Inputi}>
              <div className={style.Red}>
                <Input text={ime} icon="boy" onChange={setIme} />
                <Input
                  text={lokacija}
                  icon="location_on"
                  onChange={setLokacija}
                />
              </div>
              <div className={style.Red}>
                <Input
                  disabled
                  text={user.email}
                  icon="mail"
                  onChange={() => {}}
                />
                <Input text={brTel} icon="call" onChange={setBrTel} />
              </div>
            </div>

            <div className={style.TekstArea}>
              <textarea
                placeholder="Recite nesto vise o sebi"
                className={style.TxtArea}
                onChange={handleOpis}
                value={opis}
              />
            </div>
            <div className={style.Dugmenajjace}>
              <div className={style.Dugme2}>
                {/* da azuriram korisnika */}
                <MojButton
                  text="Sacuvaj"
                  onClick={() => {}}
                  wide={true}
                  center={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.MojiOglasi}>
        <div>
          <h2>Moji oglasi</h2>
        </div>
        <div className={style.OglasiKartice}>
          {MojiOglasi &&
            MojiOglasi.map((oglas) => (
              <div key={oglas.id}>
                <OglasKartica oglas={oglas} onClick={() => {}} />
              </div>
            ))}
        </div>
        <div className={style.Dugmenajjace}>
          <div className={style.Dugme2}>
            <MojButton
              text="Dodaj oglas"
              onClick={() => {
                navigate("/prostor/oglasiProstor");
              }}
              wide={true}
              center={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
