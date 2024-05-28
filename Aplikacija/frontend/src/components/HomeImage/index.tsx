import MojButton from "@/components/lib/button";
import style from "./style.module.css";
import OglasKartica from "@/components/OglasKartica";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/auth";
import DivFilteri from "@/pages/search/DivFilteri";
import { useGetAllCitiesQuery } from "@/store/api/endpoints/oglas";

const HomeImage = () => {
  const user = useSelector(selectUser);
  const cities = useGetAllCitiesQuery();
  console.log(cities);

  return (
    <div className={style.SearchDiv}>
      <div className={style.GoreDiv}>
        <div className={style.TekstDivVeliki}>
          <h1>Pronađite svoj savršeni prostor!</h1>
        </div>
        <div className={style.TekstDivMali}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis
            ornare tortor sed dignissim. Nunc ac ipsum placerat, cursus arcu in,
            facilisis purus.{" "}
          </p>
        </div>
      </div>
      <div className={style.DoleDiv}>
        {user ? (
          <div className={style.Dugmad}>
            {nizDugmad.map((dugme, index) => {
              return (
                <MojButton
                  text={dugme}
                  onClick={() => {}}
                  paddingX="12px"
                  paddingY="15px"
                  fontSize="15px"
                  backgroundColor="white"
                  color="black"
                />
              );
            })}
          </div>
        ) : (
          <div className={style.PrijavaPretrazi}>
            <MojButton
              text="Prijava"
              backgroundColor="white"
              color="black"
              onClick={() => {}}
              paddingX="40px"
              paddingY="15px"
            />
            <MojButton
              text="Pretrazi"
              backgroundColor="white"
              color="black"
              onClick={() => {}}
              paddingX="40px"
              paddingY="15px"
            />
          </div>
        )}

        {user ? <DivFilteri /> : ""}
      </div>
    </div>
  );
};

const nizDugmad = [
  "Sve",
  "Rođendan",
  "Žurka",
  "Team building",
  "Momačko veče",
  "Devojačko vece",
  "Ostalo",
];

export default HomeImage;
