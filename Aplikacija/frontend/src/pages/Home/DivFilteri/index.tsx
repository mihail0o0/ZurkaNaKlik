import MojButton from "@/components/lib/button";
import style from "./style.module.css";
import BrojLjudi from "./brojLjudi";
import Cena from "./cena";
import Datum from "./datum";
import Grad from "./grad";

const DivFilteri = () => {
  return (
    <div className={style.DivZaPretragu}>
      {/* ovde idu filteri */}
      {/* prvo div za ikonice i unos teksta */}
      <div className={style.DugmeFilter}>
        <Grad />
        <Datum />
        <Cena />
        <BrojLjudi />
        <MojButton
          text="Pretrazi "
          onClick={() => {}}
          paddingX="25px"
          paddingY="15px"
          fontSize="15px"
          wide="20%"
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
