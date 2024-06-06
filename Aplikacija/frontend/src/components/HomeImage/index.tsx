import MojButton from "@/components/lib/button";
import style from "./style.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/auth";
import DivFilteri from "@/pages/Home/DivFilteri";
import { useGetAllCitiesQuery } from "@/store/api/endpoints/oglas";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { tipProslave } from "@/types";

type Props = {
  tipoviProslave: tipProslave[];
  setTipoviProslave: (arg0: tipProslave[]) => void;
};

const HomeImage = ({ tipoviProslave, setTipoviProslave }: Props) => {
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
            Oglašavajte i iznajmljujte savršen prostor za žurke. Na našoj
            platformi lako pronađite ili ponudite prostor za događaje i naručite
            vrhunski ketering za vašu žurku.{" "}
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
