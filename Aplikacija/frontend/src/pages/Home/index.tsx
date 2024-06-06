import style from "./style.module.css";
import OglasKartica from "@/components/OglasKartica";
import HomeImage from "@/components/HomeImage";
import { useState } from "react";
import { tipProslave } from "@/types";

const Home = () => {
  const [tipoviProslave, setTipoviProslave] = useState<tipProslave[]>([
    { value: "Sve", selected: false },
    { value: "Rođendan", selected: false },
    { value: "Žurka", selected: false },
    { value: "Team building", selected: false },
    { value: "Momačko veče", selected: false },
    { value: "Devojačko veče", selected: false },
    { value: "Ostalo", selected: false },
  ]);

  return (
    <div className={style.SearchGlavni}>
      <HomeImage
        tipoviProslave={tipoviProslave}
        setTipoviProslave={setTipoviProslave}
      />

      <div className={style.SearchKartice}>
        {/* <OglasKartica
        /> */}
      </div>
    </div>
  );
};

export default Home;
