import Input from "@/components/lib/inputs/text-input";
import style from "./style.module.css";
import { ChangeEvent, useRef, useState } from "react";
import MojButton from "@/components/lib/button";
import LabeledAvatar from "@/components/LabeledAvatar";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/auth";
import OglasKartica from "@/components/OglasKartica";

const Profile = () => {
  const user = useSelector(selectUser);

  const [ime, setIme] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [brTel, setBrTel] = useState(user.phoneNumber);
  const [slikaProfila, setSlikaProfila] = useState("");
  const [lokacija, setLokacija] = useState("");
  const [opis, setOpis] = useState("");

  function handleOpis(event: ChangeEvent<HTMLTextAreaElement>) {
    setOpis(event.target.value);
  }
  return (
    <div className={`containerWrapper ${style.Container}`}>
      <div className={style.PostavkeProfila}>
        <div >
          <h2>Postavke profila</h2>
        </div>
        <div className={style.Postavke2}>
          {/* odje ide slika od kad je clan broj oglasa i prosecna ocena */}
          <div className={style.KarticaSaSlikom}>
            <div className={style.SlikaImeIPrezime}>
              {/* ovde ce mora da se uredi slika jer je ova sama zaobljena  i uslov ako nema slika onda ide avatar*/}
              <img src=".\public\images\slikaprofila.png" />
              {/* {ime && <LabeledAvatar text={ime} />} */}
              {/* ime i prezime kad miks doda prezime */}
              {ime && <p>{ime}</p>}
            </div>
            <div className={style.InfoOClanu}>
              {email && <p>Email: {email}</p>}
              {brTel && <p>Broj telefona: {brTel}</p>}
              <p>Clan od: 10.3.2002.</p>
            </div>
          </div>
          <div className={style.OsnovnePostavkeProfila}>
            <div className={style.PostavkeProfilaTXT}>
              <h2>Osnovne postavke profila</h2>
            </div>
            <div className={style.Inputi}>
              <div className={style.Red}>
                <div className={style.InputResssi}>
                  <Input text={ime} icon="boy" onChange={setIme} />
                </div>
                <div className={style.InputResssi}>
                  <Input
                    text={"trenutno nema"}
                    icon="location_on"
                    onChange={() => {}}
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
