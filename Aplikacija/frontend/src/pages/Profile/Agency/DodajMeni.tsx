import MojButton from "@/components/lib/button";
import Input from "@/components/lib/inputs/text-input";
import style from "./style.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import {
  useAddMenuMutation,
  useDeleteMenuMutation,
} from "@/store/api/endpoints/agencija";
import { enumToString } from "@/utils/enumMappings";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/auth";
import DisplayCard from "@/components/DisplayCard";
import { toast } from "react-toastify";

type Props = {
  kategorije?: Category[];
  menuData?: Menu;
};

const DodajIzmeniMeni = ({ kategorije, menuData }: Props) => {
  const currUser = useSelector(selectUser);

  const [opisMenija, setOpisMenija] = useState("");
  const [imeMenija, setImeMenija] = useState("");
  const [cenaMeni, setCenaMeni] = useState("");
  const [kategorija, setkategorija] = useState("");

  useEffect(() => {
    if (!menuData) return;

    let selectedKategorija = "";
    if (kategorije) {
      for (let i = 0; i < kategorije?.length; i++) {
        if (kategorije[i].id === menuData.idKategorije) {
          selectedKategorija = kategorije[i].naziv;
        }
      }
    }

    setOpisMenija(menuData.opis);
    setImeMenija(menuData.naziv);
    setCenaMeni(String(menuData.cenaMenija));
    setkategorija(selectedKategorija);
  }, [menuData]);

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setkategorija(event.target.value);
  };

  function updateOpisMenija(event: ChangeEvent<HTMLTextAreaElement>) {
    setOpisMenija(event.target.value);
  }

  const [addMenu] = useAddMenuMutation();

  const submit = async () => {
    let cena:number=parseInt(cenaMeni);
    let idKategorije:number=parseInt(kategorija);

    const newMenu: Omit<Menu, "id" | "idKategorije"> = {
      naziv: imeMenija,
      slika: "",
      opis: opisMenija,
      cenaMenija: cena,
      sastavMenija: [""],
    };

    const addMenuDTO: AddMenuDTO = {
      id: idKategorije,
      menu: newMenu,
    };

   const result = await addMenu(addMenuDTO);

    if ("error" in result) {
      return;
    }

    toast.success("Oglas je uspesno dodat!");
    
    setOpisMenija("");
    setImeMenija("");
    setCenaMeni("");
    setkategorija("");
  };

  return (
    <div className={style.menijji}>
      <div className={style.InputiOpisPlusic}>
        {/* odje ide ime menija blabla */}
        <div className={style.Kocka}>
          <div className={style.Red}>
            <div className={style.Inputsredi}>
              <Input
                text={imeMenija}
                placeholder="Ime menija"
                onChange={setImeMenija}
              />
            </div>

            <div className={style.Inputsredi}>
              <Input text="Odaberi sliku" onChange={() => {}} />
            </div>
          </div>
          <div className={style.Red}>
            <div className={style.Inputsredi}>
              <Input
                text={cenaMeni}
                placeholder="Cena"
                onChange={setCenaMeni}
              />
            </div>
            <div className={style.Inputsredi}>
              <Select
                value={kategorija}
                onChange={handleChange}
                sx={{
                  minWidth: "250px",
                  borderRadius: "20px",
                }}
              >
                {/* kroz petlju */}

                {kategorije &&
                  kategorije.map((kategorija) => {
                    return (
                      <MenuItem value={kategorija.id}>
                        {kategorija.naziv}
                      </MenuItem>
                    );
                  })}
              </Select>
            </div>
          </div>
        </div>
        {/* opis menija */}
        <div className={style.Kocka}>
          <textarea
            placeholder="Opis menija"
            className={style.TxtAreaMeny}
            value={opisMenija}
            onChange={updateOpisMenija}
          />
        </div>
        <div className={style.Kocka}>
          <MojButton
            onClick={submit}
            icon="add"
            paddingX="20px"
            paddingY="20px"
          />
        </div>
      </div>
    </div>
  );
};
export default DodajIzmeniMeni;
