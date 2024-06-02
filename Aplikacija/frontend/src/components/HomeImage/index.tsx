import MojButton from "@/components/lib/button";
import style from "./style.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/auth";
import DivFilteri from "@/pages/Home/DivFilteri";
import { useGetAllCitiesQuery } from "@/store/api/endpoints/oglas";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type tipProslave = {
  value: string;
  selected: boolean;
};

const HomeImage = () => {
  const [tipoviProslave, setTipoviProslave] = useState<tipProslave[]>([
    { value: "Sve", selected: false },
    { value: "Rođendan", selected: false },
    { value: "Žurka", selected: false },
    { value: "Team building", selected: false },
    { value: "Momačko veče", selected: false },
    { value: "Devojačko veče", selected: false },
    { value: "Ostalo", selected: false },
  ]);

  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const cities = useGetAllCitiesQuery();

  const selectTipProslave = (index: number) => {
    let sel = [...tipoviProslave];
    sel[index].selected = !sel[index].selected;

    // klik na sve
    if (sel[index].value == "Sve") {
      sel.forEach((el) => {
        el.selected = sel[index].selected;
      });
    }

    // klik na bilo sta drugo kad je selektano sve
    if (sel[index].value != "Sve" && sel[index].selected == false) {
      sel.forEach((el) => {
        if (el.value != "Sve") return;
        el.selected = false;
      });
    }

    setTipoviProslave(sel);
  };

  return (
    <div className={style.SearchDiv}>
      <div className={style.contentWrapper}>
        <div className={style.GoreDiv}>
          <h1>Pronađite svoj savršeni prostor!</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis
            ornare tortor sed dignissim. Nunc ac ipsum placerat, cursus arcu in,
            facilisis purus.{" "}
          </p>
        </div>

        <div className={style.DoleDiv}>
          {user ? (
            <div className={style.Dugmad}>
              {tipoviProslave.map((dugme, index) => {
                return (
                  <MojButton
                    text={dugme.value}
                    onClick={() => {
                      selectTipProslave(index);
                    }}
                    paddingX="14px"
                    paddingY="14px"
                    fontSize="16px"
                    backgroundColor={
                      tipoviProslave[index].selected ? undefined : "white"
                    }
                    color={tipoviProslave[index].selected ? undefined : "black"}
                    small={true}
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
                onClick={() => {
                  navigate("/Login");
                }}
                paddingX="40px"
                paddingY="15px"
              />
              <MojButton
                text="Pretrazi"
                backgroundColor="white"
                color="black"
                onClick={() => {
                  navigate("/search");
                }}
                paddingX="40px"
                paddingY="15px"
              />
            </div>
          )}

          {user ? <DivFilteri /> : ""}
        </div>
      </div>
    </div>
  );
};

export default HomeImage;
