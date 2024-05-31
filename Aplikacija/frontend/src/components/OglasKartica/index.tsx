import { CSSProperties, useMemo, useState } from "react";
import style from "./style.module.css";
import Icon from "../lib/icon";
import { Typography, useMediaQuery } from "@mui/material";
import MojButton from "../lib/button";

type Props = {
  nazivProstora: string;
  slika: string;
  tipoviProslave: string[];
  isFavorite: boolean;
  prosecnaOcena: number | string;
  opis: string;
  cena: string | number;
  brojLjudi: string;
  lokacija: string;
  onClick: React.MouseEventHandler<HTMLButtonElement> | (() => void);
};

const OglasKartica = ({
  nazivProstora,
  slika,
  tipoviProslave,
  isFavorite,
  prosecnaOcena,
  opis,
  cena,
  brojLjudi,
  lokacija,
  onClick,
}: Props) => {
  const [favorite, setFavorite] = useState(isFavorite);
  function updateFavorite() {
    setFavorite((prevFavorite) => !prevFavorite);
  }

  const OglasKarticaStyle: CSSProperties = {};

  const SlikaKartica: CSSProperties = {
    backgroundImage: `url(${slika})`,
  };

  const textTipProslave: string = useMemo(() => {
    let finalString = "";

    for(let i = 0; i < tipoviProslave.length; i++){
      finalString += tipoviProslave[i];
      if(i < tipoviProslave.length - 1){
        finalString += ", ";
      }
    }

    return finalString;
  }, [tipoviProslave]);

  return (
    <div className={style.GlavniDiv}>
      <div className={style.SlikaKartica} style={SlikaKartica}>
        {/* ovde ide slika , pa onda tip proslave i dal je omiljeno ili ne */}
        <div className={style.TipOmiljeno}>
          <div>
            <p>{textTipProslave}</p>
          </div>


          {/* // TODO izmeni u icon */}
          <img
            onClick={updateFavorite}
            src={
              favorite
                ? "../public/images/favorite.png"
                : "../public/images/not_favorite.png"
            }
            alt={favorite ? "Favorite" : "Not Favorite"}
          />

        </div>
      </div>
      <div className={style.ViseInfo}>
        {/* treba mi za tekst gore i dole za cenu,broj,lokaciju*/}
        <div className={style.ViseInfoTekst}>
          <div className={style.ImeOcena}>
            <h2>{nazivProstora}</h2>
            <div className={style.Ocena}>
              <Icon icon="grade" />
              <p>{prosecnaOcena}</p>
            </div>
          </div>
          <div className={style.Opis}>
            <Typography>{opis}</Typography>
          </div>
        </div>
        {/* ovde cena broj lokacija */}
        <div className={style.CenaBrojLokacija}>
          <div className={style.BottomIcon}>
            {/* cena  */}
            <Icon icon="euro_symbol" />
            <p>{cena}</p>
          </div>
          <div className={style.BottomIcon}>
            {/* broj ljudi */}
            <Icon icon="boy" />
            <p>{brojLjudi}</p>
          </div>
          <div className={style.BottomIcon}>
            {/* lokacija */}
            <Icon icon="location_on" />
            <p>{lokacija}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OglasKartica;
