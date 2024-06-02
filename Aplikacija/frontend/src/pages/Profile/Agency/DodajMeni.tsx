import MojButton from "@/components/lib/button";
import Input from "@/components/lib/inputs/text-input";
import style from "./style.module.css";
import { ChangeEvent, useState } from "react";
import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import {
  useAddMenuMutation,
  useDeleteMenuMutation,
} from "@/store/api/endpoints/agencija";

type Props = {
  kategorije?: Category[];
};

const DodajMeni = ({ kategorije }: Props) => {
  const [opisMenija, setOpisMenija] = useState("");
  const [imeMenija, setImeMenija] = useState("");
  const [cenaMeni, setCenaMeni] = useState("");
  const [kategorijaa, setkategorija] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setkategorija(event.target.value);
  };

  function updateOpisMenija(event: ChangeEvent<HTMLTextAreaElement>) {
    setOpisMenija(event.target.value);
  }

  const [addMenu] = useAddMenuMutation();
  const [deleteMenu] = useDeleteMenuMutation();

  const submit = async () => {

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
                value={kategorijaa}
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
export default DodajMeni;
