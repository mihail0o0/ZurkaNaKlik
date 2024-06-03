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

type Props = {
  kategorije?: Category[];
  menuData?: Menu;
};

const DodajIzmeniMeni = ({ kategorije, menuData }: Props) => {
  const [opisMenija, setOpisMenija] = useState("");
  const [imeMenija, setImeMenija] = useState("");
  const [cenaMeni, setCenaMeni] = useState("");
  const [kategorija, setkategorija] = useState("");

  useEffect(() => {
    if (!menuData) return;



    setOpisMenija(menuData.opis);
    setImeMenija(menuData.naziv);
  }, [menuData]);

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setkategorija(event.target.value);
  };

  function updateOpisMenija(event: ChangeEvent<HTMLTextAreaElement>) {
    setOpisMenija(event.target.value);
  }

  const [addMenu] = useAddMenuMutation();
  const [deleteMenu] = useDeleteMenuMutation();

  const submit = async () => {};

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
