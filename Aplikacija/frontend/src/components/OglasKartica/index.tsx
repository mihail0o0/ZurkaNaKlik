import { CSSProperties, useState } from "react";
import style from "./style.module.css";
import Icon from "../lib/icon";
import { Typography } from "@mui/material";

type Props = {
  nazivProstora: string;
  slika: string;
  tipProslave: string;
  favorite: boolean;
  prosecnaOcena: string;
  opis: string;
  cena: string;
  brojLjudi: string;
  lokacija: string;
  onClick: React.MouseEventHandler<HTMLButtonElement> | (() => void);
};

const OglasKartica = ({
  nazivProstora,
  slika,
  tipProslave,
  favorite,
  prosecnaOcena,
  opis,
  cena,
  brojLjudi,
  lokacija,
  onClick,
}: Props) => {
  const OglasKarticaStyle: CSSProperties = {};
  return (
    <div className={style.GlavniDiv}>
      <div className={style.SlikaKartica}>
        {/* ovde ide slika , pa onda tip proslave i dal je omiljeno ili ne */}
        <div className={style.TipOmiljeno}>
          <div>
            <p>{tipProslave}</p>
          </div>

          <img
            src={
              favorite ? "../public/images/favorite.png" : "../public/images/not_favorite.png"
            }
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
            {opis}
          </div>
        </div>
        {/* ovde cena broj lokacija */}
        <div className={style.CenaBrojLokacija}>
          <div className={style.Cena}>
            {/* cena  */}
            <Icon icon="euro_symbol" />
            <p>{cena}</p>
          </div>
          <div className={style.BrojLjudi}>
            {/* broj ljudi */}
            <Icon icon="boy" />
            <p>{brojLjudi}</p>
          </div>
          <div className={style.Lokacija}>
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
