import Input from "@/components/lib/inputs/text-input";
import style from "./style.module.css";
import { ChangeEvent, useRef, useState } from "react";
import MojButton from "@/components/lib/button";
import LabeledAvatar from "@/components/LabeledAvatar";

const Profile = () => {
   const[prezime,setPrezime]=useState('');
   const[ime,setIme]=useState('');
   const[email,setEmail]=useState('');
   const[brTel,setBrTel]=useState('');
   const[slikaProfila,setSlikaProfila]=useState('');
   const[lokacija,setLokacija]=useState('');
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
              <LabeledAvatar text={"Marina"} />
              <p>Marina Ignjatovic</p>
            </div>
            <div className={style.InfoOClanu}>
               {/* ovde moze email */}
              <p>Clan od: 10.3.2002.</p>
              <p>Broj oglasa: 30</p>
              <p>Clan od: 10.3.2002.</p>
            </div>
          </div>
          <div className={style.OsnovnePostavkeProfila}>
            <div>
              <h2>Osnovne postavke profila</h2>
            </div>
            <div className={style.Inputi}>
              <div className={style.Red}>
                <div className={style.InputResssi}>
                  <Input
                    text={"Marija Ignjatovic"}
                    icon="boy"
                    onChange={() => {}}
                  />
                </div>
                <div className={style.InputResssi}>
                  <Input text={"Nis"} icon="location_on" onChange={() => {}} />
                </div>
              </div>
              <div className={style.Red}>
                <div className={style.InputResssi}>
                  <Input text={"Email"} icon="mail" onChange={() => {}} />
                </div>
                <div className={style.InputResssi}>
                  <Input text={"0677663629"} icon="call" onChange={() => {}} />
                </div>
              </div>
            </div>
            {/* txt area */}

            <div className={style.TekstArea}>
              <textarea
                placeholder="Recite nesto vise o sebi"
                className={style.TxtArea}
                onChange={() => {}}
                value={""}
              />
            </div>
            <div className={style.Dugmenajjace}>
              <div className={style.Dugme2}>
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
        <div className={style.OglasiKartice}>{/* ovde idu kartice */}</div>
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
