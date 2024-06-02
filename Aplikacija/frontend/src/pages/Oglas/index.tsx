import { useParams } from "react-router-dom";
import style from "./style.module.css";
import { useGetOglasQuery } from "@/store/api/endpoints/oglas";
import Icon from "@/components/lib/icon";
import { useGetUserDataQuery } from "@/store/api/endpoints/korisnik";
import UserAvatar from "@/components/UserAvatar";
import MojButton from "@/components/lib/button";
import BrojLjudi from "../Home/DivFilteri/brojLjudi";

const Oglas = () => {
  const { id } = useParams();
 
  const { data: currentOglas } = useGetOglasQuery(id);
  const { data: VlasnikOglasa } = useGetUserDataQuery(currentOglas?.idVlasnika);
  console.log(currentOglas?.listaTipProslava);
  return (
    <div className={`containerWrapper ${style.Glavni}`}>
      <div className={style.PodeliteOmiljeno}>
        {/* ovde kad ide onclick treba da radi podeli */}
        <div onClick={() => {}} className={style.Podelite}>
          <Icon icon="ios_share" />
          <label>Podelite</label>
        </div>
        {/* ovde da se doda u omiljeni */}
        <div onClick={() => {}} className={style.Podelite}>
          <Icon icon="favorite" />
          <label>Dodajte oglas u omiljene</label>
        </div>
      </div>
      <div>{/* slike */}</div>
      {/* informacije ispod slike */}
      <div className={style.Informacije}>
        <div className={style.InformacijeKolona}>
          <div className={style.PrvaKocka}>
            <div>
              <h1>{currentOglas?.naziv}</h1>
              <div>
                <Icon icon="grade" />
                <label>{currentOglas?.ocena}</label>
              </div>
            </div>
            <div className={style.OsobeKrevetKupatilo}>
              <div className={style.Osobe}>
                <Icon icon="view_in_ar" />
                <label>{currentOglas?.kvadratura}</label>
              </div>
              <div className={style.Osobe}>
                <Icon icon="bed" />
                <label>{currentOglas?.brojKreveta}</label>
              </div>
              <div className={style.Osobe}>
                <Icon icon="bathroom" />
                <label>{currentOglas?.brojKupatila}</label>
              </div>
            </div>
            <div>
              <p>{currentOglas?.opis}</p>
            </div>
          </div>
          {/* ovde ide info o vlasniku */}
          <div className={style.InfoOVlasniku}>
            <div className={style.Slikaime}>
              <UserAvatar src={VlasnikOglasa?.profilePhoto} />
              <h2>
                {VlasnikOglasa?.name} {VlasnikOglasa?.lastName}
              </h2>
              <div>
                <MojButton
                  text="Posalji poruku"
                  wide={true}
                  center={true}
                  onClick={() => {}}
                />
              </div>
            </div>
            <div className={style.OpisVlasnika}>
              {/* opis */}
              {/* <p>{VlasnikOglasa?.}</p> */}
              <p>
                Fina i opustena vlasnica nekoliko vila. Prijatna za
                konverzaciju. Bla bla bla malo duzi tekst treba biti radi boljeg
                opisa.
              </p>
            </div>
          </div>
          {/* ii opremljenost */}
          <div className={style.Opremljenost}></div>
        </div>
        {/* ovde ide s desne strane sve sto treba */}
        <div className={style.InformacijeKolona}>
          <div className={style.Kontakt}>
            <h4>Kontaktirajte nas</h4>
            <div className={style.RedKontakt}>
              <Icon icon="mail" />
              <h5>{VlasnikOglasa?.email}</h5>
            </div>
            <div className={style.RedKontakt}>
              <Icon icon="location_on" />
              <h5>{currentOglas?.grad}</h5>
            </div>
            <div className={style.RedKontakt}>
              <Icon icon="phone" />
              <h5>{currentOglas?.brTel}</h5>
            </div>
          </div>
          <div className={style.DodajteKetering}>
                <h4>Dodajte ketering: </h4>
                <div>
                    <MojButton text="Vidite opcije" onClick={()=>{}} wide={true} center={true} paddingY="10px"/>
                </div>
          </div>
          <div className={style.DodajteKetering}>
                <h4>Unesite broj gostiju: </h4>
                <BrojLjudi />
                
          </div>
        </div>
      </div>
    </div>
  );
};
export default Oglas;
