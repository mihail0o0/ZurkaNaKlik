import MojButton from "@/components/lib/button";
import style from "./style.module.css";
import BrojLjudi from "./brojLjudi";
import Cena from "./cena";
import Datum from "./datum";
import Grad from "./grad";
import { useState } from "react";
import JosFiltera from "./josFiltera";
import { stringToEnum } from "@/utils/enumMappings";
import {
  dodatnaOpremaMap,
  tipGrejanjaMap,
  tipProstoraMap,
} from "@/store/api/endpoints/oglas/types";

const DivFilteri = () => {
  const [gradValue, setGradValue] = useState<string | null>(null);
  const [cenaOd, setCenaOd] = useState("");
  const [cenaDo, setCenaDo] = useState("");
  const [broj, setBroj] = useState("");
  const [selectedDodatnaOprema, setSelectedDodatnaOprema] = useState<number[]>(
    []
  );
  const [selectedTipoviProstora, setSelectedTipoviProslava] = useState<
    number[]
  >([]);
  const [selectedTipoviGrejanja, setSelectedTipoviGrejanja] = useState<
    number[]
  >([]);

  const handleChangeDodatnaOprema = (value: string) => {
    const type = stringToEnum(value, dodatnaOpremaMap);
    if (type == undefined || type == null) return;

    const set = new Set(selectedDodatnaOprema);
    if (set.has(type)) {
      set.delete(type);
    } else {
      set.add(type);
    }

    setSelectedDodatnaOprema(Array.from(set));
  };
  const handleChangeTipProstora = (value: string) => {
    const type = stringToEnum(value, tipProstoraMap);
    if (type == undefined || type == null) return;

    const set = new Set(selectedTipoviProstora);
    if (set.has(type)) {
      set.delete(type);
    } else {
      set.add(type);
    }

    setSelectedTipoviProslava(Array.from(set));
  };
  const handleChangeTipGrejanja = (value: string) => {
    const type = stringToEnum(value, tipGrejanjaMap);
    if (type == undefined || type == null) return;

    const set = new Set(selectedTipoviGrejanja);
    if (set.has(type)) {
      set.delete(type);
    } else {
      set.add(type);
    }

    setSelectedTipoviGrejanja(Array.from(set));
  };

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
      <JosFiltera
        selectedDodatnaOprema={selectedDodatnaOprema}
        selectedTipoviProstora={selectedTipoviProstora}
        selectedTipoviGrejanja={selectedTipoviGrejanja}
        handleChangeDodatnaOprema={handleChangeDodatnaOprema}
        handleChangeTipProstora={handleChangeTipProstora}
        handleChangeTipGrejanja={handleChangeTipGrejanja}
      />
    </div>
  );
};

export default DivFilteri;
