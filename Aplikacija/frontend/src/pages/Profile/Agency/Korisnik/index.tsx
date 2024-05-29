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

import { Alert } from "@mui/material";

const Profile = () => {
  const userCurr = useSelector(selectUser);
  const { data: user } = useGetUserDataQuery(userCurr?.id);
  const [ime, setIme] = useState(user?.name ?? "");
  const [prezime, setPrezime] = useState(user?.lastName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [brTel, setBrTel] = useState(user?.phoneNumber ?? "");
  const [slikaProfila, setSlikaProfila] = useState(user?.profilePhoto ?? "");
  const [lokacija, setLokacija] = useState(user?.location ?? "");
  const [opis, setOpis] = useState("");

  useEffect(() => {
    const savedProfile = localStorage.getItem("profileSettings");
    if (savedProfile) {
      const profileData = JSON.parse(savedProfile);
      setIme(profileData.ime ?? "");
      setPrezime(profileData.prezime ?? "");
      setEmail(profileData.email ?? "");
      setBrTel(profileData.brTel ?? "");
      setSlikaProfila(profileData.slikaProfila ?? "");
      setLokacija(profileData.lokacija ?? "");
      setOpis(profileData.opis ?? "");
    }
  }, []);

  const sacuvajIzmene = () => {
    const profileData = {
      ime,
      prezime,
      email,
      brTel,
      slikaProfila,
      lokacija,
      opis,
    };
    localStorage.setItem("profileSettings", JSON.stringify(profileData));
    return (
      <Alert variant="outlined" severity="success">
        Promene su uspesno sacuvane!
      </Alert>
    );
  };

  function handleOpis(event: ChangeEvent<HTMLTextAreaElement>) {
    setOpis(event.target.value);
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
              <UserAvatar src={slikaProfila} />

              <p>
                {user?.name ?? ""} {user?.lastName ?? ""}
              </p>
            </div>
            <div className={style.InfoOClanu}>
              {email && <p>Email: {user?.email ?? ""}</p>}
              {brTel && <p>Broj telefona: {user?.phoneNumber ?? ""}</p>}
              <p>{user?.location ?? ""}</p>
            </div>
          </div>
          <div className={style.OsnovnePostavkeProfila}>
            <div className={style.PostavkeProfilaTXT}>
              <h2>Osnovne postavke profila</h2>
            </div>
            <div className={style.Inputi}>
              <div className={style.Red}>
                <div className={style.InputResssi}>
                  <Input
                    text={ime + " " + prezime}
                    icon="boy"
                    onChange={setIme}
                  />
                </div>
                <div className={style.InputResssi}>
                  <Input
                    text={lokacija}
                    icon="location_on"
                    onChange={setLokacija}
                  />
                </div>
              </div>
              <div className={style.Red}>
                <div className={style.InputResssi}>
                  <Input text={email} icon="mail" onChange={setEmail} />
                </div>
                <div className={style.InputResssi}>
                  <Input text={brTel} icon="call" onChange={setBrTel} />
                </div>
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
                  onClick={sacuvajIzmene}
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
          <OglasKartica
            nazivProstora="Vila Maria"
            slika="../public/images/slika-kartica-proba.jpg"
            tipProslave="zurka,proslava"
            isFavorite={false}
            prosecnaOcena="4,5"
            opis="Prelepa vikendica u blizini Nisa koja svakog posetioca ostavlja bez daha! Posetite nas i vidite zasto je bas nasa usluga najbolja"
            cena="120"
            brojLjudi="12"
            lokacija="Nis"
            onClick={() => {}}
          />
          <OglasKartica
            nazivProstora="Vila Maria"
            slika="slika"
            tipProslave="zurka,proslava"
            isFavorite={false}
            prosecnaOcena="4,5"
            opis="Prelepa vikendica u blizini Nisa koja svakog posetioca ostavlja bez daha! Posetite nas i vidite zasto je bas nasa usluga najbolja"
            cena="120"
            brojLjudi="12"
            lokacija="Nis"
            onClick={() => {}}
          />
          <OglasKartica
            nazivProstora="Vila Maria"
            slika="../public/images/slika-kartica-proba.jpg"
            tipProslave="zurka,proslava"
            isFavorite={true}
            prosecnaOcena="4,5"
            opis="Prelepa vikendica u blizini Nisa koja svakog posetioca ostavlja bez daha! Posetite nas i vidite zasto je bas nasa usluga najbolja"
            cena="120"
            brojLjudi="12"
            lokacija="Nis"
            onClick={() => {}}
          />
          <OglasKartica
            nazivProstora="Vila Maria"
            slika="../public/images/slika-kartica-proba.jpg"
            tipProslave="zurka,proslava"
            isFavorite={true}
            prosecnaOcena="4,5"
            opis="Prelepa vikendica u blizini Nisa koja svakog posetioca ostavlja bez daha! Posetite nas i vidite zasto je bas nasa usluga najbolja"
            cena="120"
            brojLjudi="12"
            lokacija="Nis"
            onClick={() => {}}
          />
          <OglasKartica
            nazivProstora="Vila Maria"
            slika="../public/images/slika-kartica-proba.jpg"
            tipProslave="zurka,proslava"
            isFavorite={true}
            prosecnaOcena="4,5"
            opis="Prelepa vikendica u blizini Nisa koja svakog posetioca ostavlja bez daha! Posetite nas i vidite zasto je bas nasa usluga najbolja"
            cena="120"
            brojLjudi="12"
            lokacija="Nis"
            onClick={() => {}}
          />
          {/* ovde idu kartice */}
        </div>
        <div className={style.Dugmenajjace}>
          <div className={style.Dugme2}>
            <MojButton
              text="Dodaj oglas"
              onClick={() => {}}
              wide={true}
              center={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;