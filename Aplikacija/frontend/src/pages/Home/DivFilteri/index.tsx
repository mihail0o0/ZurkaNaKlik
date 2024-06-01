import MojButton from "@/components/lib/button";
import style from "./style.module.css";
import BrojLjudi from "./brojLjudi";
import Cena from "./cena";
import Datum from "./datum";
import Grad from "./grad";
import { useState } from "react";

const DivFilteri = () => {
  const [gradValue, setGradValue] = useState<string | null>(null);
  const [cenaOd, setCenaOd] = useState("");
  const [cenaDo, setCenaDo] = useState("");
  const [broj, setBroj] = useState("");

  return (
    <div className={style.DivZaPretragu}>
      {/* ovde idu filteri */}
      {/* prvo div za ikonice i unos teksta */}
      <div className={style.DugmeFilter}>
        <Grad value={gradValue} setValue={setGradValue} />

        <Datum />

        <Cena
          cenaOd={cenaOd}
          cenaDo={cenaDo}
          setCenaOd={setCenaOd}
          setCenaDo={setCenaDo}
        />

        <BrojLjudi broj={broj} setBroj={setBroj} />

        <MojButton
          text="Pretrazi "
          onClick={() => {}}
          paddingX="80px"
          paddingY="18px"
          fontSize="15px"
          center={true}
        />
      </div>
      {/*jos filterea*/}
      <div className={style.JosFiltera}>
        <img src="../public/images/page_info.png" />
        <p>Još filtera</p>
      </div>
    </div>
  );
};

export default DivFilteri;
