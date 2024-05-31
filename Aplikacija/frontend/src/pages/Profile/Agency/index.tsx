import Input from "@/components/lib/inputs/text-input";
import style from "./style.module.css";
import { ChangeEvent,  useState } from "react";
import MojButton from "@/components/lib/button";
import DodajMeni from "./DodajMeni";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "@/store/api/endpoints/agencija";
import { Chip } from "@mui/material";

const AgencyProfile = () => {
  const [checked, SetChecked] = useState(false);
  const [opisAgencije, setOpisAgencije] = useState("");
  const [grad, setGrad] = useState("");
  const [broj, setBroj] = useState("");
  const [cenaAgencija, setCenaAgencija] = useState("");
  const [imeKategorije, setImeKategorije] = useState<string>("");

  const [addCategory] = useAddCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [brMenija, setBrMenija] = useState(1);

  const addMeni = () => {
    setBrMenija(brMenija + 1);
  };
  const renderComponents = () => {
    const components = [];
    for (let i = 0; i < brMenija; i++) {
      components.push(
        <div className={style.InputiOpisPlusic}>
          <DodajMeni kategorije={kategorije} onClick={addMeni} />
        </div>
      );
    }
    return components;
  };

  const { data: kategorije } = useGetAllCategoriesQuery();

  function handleChange() {
    SetChecked(!checked);
  }
  function updateOpisAgencije(event: ChangeEvent<HTMLTextAreaElement>) {
    setOpisAgencije(event.target.value);
  }

  const dodajNovuKategoriju = () => {
    if (imeKategorije == "") return;
    const kategorija: AddCategoryDTO = {
      naziv: imeKategorije,
    };
    addCategory(kategorija);
    setImeKategorije("");
  };

  return (
    <div className={`containerWrapper ${style.Glavni}`}>
      <div className={style.Gore}>
        {/* DIV TXT */}
        <div>
          <div>
            <h1> Postavke agencije</h1>
          </div>
          <div className={style.Paragraf}>
            <p>
              {" "}
              Dodajte opis i ostale podatke, i podesite kategorije menija koje
              posedujete, kao i individualne menije iza svake kategorije.
            </p>
          </div>
        </div>
        {/* div za opis agencije i grad,brtel, cenu i mogucnost dostave */}
        <div className={style.DodatneInfo}>
          {/* txt box */}
          <div>
            {/* <input type="text" className={style.TxtBox} /> */}
            <textarea
              placeholder="Opis agencije"
              className={style.TxtArea}
              onChange={updateOpisAgencije}
              value={opisAgencije}
            />
          </div>
          {/* inputi za grad br cenu i check */}
          <div className={style.Inputs}>
            <div className={style.Inputsredi}>
              <Input text="Grad" icon="location_on" onChange={setGrad} />
            </div>
            <div className={style.Inputsredi}>
              <Input text="0677676382" icon="call" onChange={setBroj} />
            </div>
            <div className={style.Inputsredi}>
              <Input
                text="Cena"
                icon="euro_symbol"
                onChange={setCenaAgencija}
              />
            </div>
            <label className={style.Inputsredi}>
              <input
                type="checkbox"
                checked={checked}
                onChange={handleChange}
              />
              Mogucnost dostave
            </label>
          </div>
        </div>
      </div>
      <div className={style.Dole}>
        <div className={style.DodajKategorije}>
          <h2>Dodaj kategorije za meni </h2>
          {/* CHIIIIIIIIIIIIIIIP */}

          <div className={style.Kategorije}>
            {kategorije &&
              kategorije.map((kategorija) => {
                return (
                  <Chip
                    label={kategorija.naziv}
                    variant="outlined"
                    onClick={() => {}}
                    onDelete={() => deleteCategory(kategorija.id)}
                    sx={{
                      width: "100px",
                      height: "50px",
                      margin: "3px",
                    }}
                  ></Chip>
                );
              })}
            <Input text="Ime kategorije" onChange={setImeKategorije} />
            <MojButton
              icon="add"
              onClick={dodajNovuKategoriju}
              paddingY="10px"
            />
          </div>
        </div>
        {/* ovde mi treba komponenta cela za dodaj menije */}
        <div className={style.DodajMenije}>
          {/* div za naslov samo */}
          <div>
            <h2>Dodaj menije</h2>
          </div>
          {/* odje ispod je za inputi opis i plusic */}
          <div>{renderComponents()}</div>
        </div>
      </div>
      <div className={style.NAJJACEDUGME}>
        <div className={style.SacuvajDugme}>
          <MojButton
            text="Sacuvaj"
            onClick={() => {}}
            wide={true}
            center={true}
          />
        </div>
      </div>
    </div>
  );
};

export default AgencyProfile;
