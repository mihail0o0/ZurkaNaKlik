import MojButton from "@/components/lib/button";
import style from "./style.module.css";
import DivFilteri from "./DivFilteri";
import OglasKartica from "@/components/OglasKartica";
import { useState } from "react";
const Search = () => {
  const nizDugmad = [
    "Sve",
    "Rođendan",
    "Žurka",
    "Team building",
    "Momačko veče",
    "Devojačko vece",
    "Ostalo",
  ];
  

  
  return (
    <div>
      <div className={style.SearchDiv}>
        <div className={style.GoreDiv}>
          <div className={style.TekstDivVeliki}>
            <h1>Pronađite svoj savršeni prostor!</h1>
          </div>
          <div className={style.TekstDivMali}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              mattis ornare tortor sed dignissim. Nunc ac ipsum placerat, cursus
              arcu in, facilisis purus.{" "}
            </p>
          </div>
        </div>
        <div className={style.DoleDiv}>
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
          <DivFilteri />
        </div>
      </div>
      <div className={style.SearchKartice}>
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
          slika="slika"
          tipProslave="zurka,proslava"
          isFavorite={true}
          prosecnaOcena="4,5"
          opis="Prelepa vikendica u blizini Nisa koja svakog posetioca ostavlja bez daha! Posetite nas i vidite zasto je bas nasa usluga najbolja"
          cena="120"
          brojLjudi="12"
          lokacija="Nis"
          onClick={() => {}}
      
        />
      </div>
    </div>
  );
};


export default Search;
