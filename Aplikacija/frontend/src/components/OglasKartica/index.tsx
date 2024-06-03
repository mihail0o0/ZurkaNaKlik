import { CSSProperties, useMemo, useState } from "react";
import style from "./style.module.css";
import Icon from "../lib/icon";
import { Typography, useMediaQuery } from "@mui/material";
import MojButton from "../lib/button";
import {
  OglasObjekata,
  tipProslavaMap,
} from "@/store/api/endpoints/oglas/types";
import { enumToString } from "@/utils/enumMappings";
import { useSelector } from "react-redux";
import { useGetUserDataQuery } from "@/store/api/endpoints/korisnik";
import { selectUser } from "@/store/auth";
import { useNavigate } from "react-router-dom";

// type Props = {
//   nazivProstora: string;
//   slika: string[];
//   tipoviProslave: string[];
//   isFavorite: boolean;
//   prosecnaOcena: number | string;
//   opis: string;
//   cena: string | number;
//   brojLjudi: string;
//   lokacija: string;
//   onClick: React.MouseEventHandler<HTMLButtonElement> | (() => void);
// };

type Props = {
  oglas: OglasObjekata;
  onClick: React.MouseEventHandler<HTMLButtonElement> | (() => void);
};

const OglasKartica = ({ oglas, onClick }: Props) => {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);

  const userCurr = useSelector(selectUser);
  const { data: user } = useGetUserDataQuery(userCurr?.id!, {
    skip: !userCurr,
  });

  function updateFavorite() {
    setFavorite((prevFavorite) => !prevFavorite);
  }

  const defaultImage = "/images/imageNotFound.jpg";

  const OglasKarticaStyle: CSSProperties = {};

  // TODO IZMENI, OVDE TREBA GETUJES SLIKU SA BEKA
  const SlikaKartica: CSSProperties = {
    backgroundImage:
      oglas.slike?.length > 0
        ? `url(${oglas.slike[0]})`
        : `url(${defaultImage})`,
  };

  const tipoviProslave: string[] = useMemo(() => {
    return oglas.listaTipProslava.map((tip) => {
      return enumToString(tip, tipProslavaMap);
    });
  }, [oglas]);

  const textTipProslave: string = useMemo(() => {
    let finalString = "";

    for (let i = 0; i < tipoviProslave.length; i++) {
      finalString += tipoviProslave[i];
      if (i < tipoviProslave.length - 1) {
        finalString += ", ";
      }
    }

    return finalString;
  }, [oglas]);

  return (
    <div className={style.GlavniDiv}>
      <div className={style.SlikaKartica} style={SlikaKartica}>
        {/* ovde ide slika , pa onda tip proslave i dal je omiljeno ili ne */}
        <div className={style.TipOmiljeno}>
          <div>
            <Typography noWrap maxWidth={150}>
              {textTipProslave}
            </Typography>
          </div>

          {/* // TODO izmeni u icon */}
          {/* ovde treba da ide u zavisnosti od toga da li je svoj oglas ikonica za izmeni */}
          {user && user.id !== oglas.idVlasnika ? (
            <img
              onClick={updateFavorite}
              src={
                favorite
                  ? "/images/favorite.png"
                  : "/images/not_favorite.png"
              }
              alt={favorite ? "Favorite" : "Not Favorite"}
            />
          ) : (
            <Icon
              icon="edit"
              onClick={() => navigate(`/prostor/izmeniProstor/${oglas.id}`)}
              classes="cursorPointer"
            />
          )}
        </div>
      </div>
      <div className={style.ViseInfo}>
        {/* treba mi za tekst gore i dole za cenu,broj,lokaciju*/}
        <div className={style.ViseInfoTekst}>
          <div className={style.ImeOcena}>
            <h2
              onClick={() => {
                navigate(`/place/${oglas.id}`);
              }}
              className="cursorPointer"
            >
              {oglas.naziv}
            </h2>
            <div className={style.Ocena}>
              <Icon icon="grade" />
              <p>{oglas.ocena}</p>
            </div>
          </div>
          <div className={style.Opis}>
            <Typography>{oglas.opis}</Typography>
          </div>
        </div>
        {/* ovde cena broj lokacija */}
        <div className={style.CenaBrojLokacija}>
          <div className={style.BottomIcon}>
            {/* cena  */}
            <Icon icon="euro_symbol" />
            <p>{oglas.cenaPoDanu}</p>
          </div>
          <div className={style.BottomIcon}>
            {/* broj ljudi */}
            <Icon icon="view_in_ar" />
            <p>{oglas.kvadratura}</p>
          </div>
          <div className={style.BottomIcon}>
            {/* lokacija */}
            <Icon icon="location_on" />
            <p>{oglas.grad}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OglasKartica;
