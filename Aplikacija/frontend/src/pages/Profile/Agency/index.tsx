import Input from "@/components/lib/inputs/text-input";
import style from "./style.module.css";
import { useState } from "react";
import MojButton from "@/components/lib/button";

const AgencyProfile = () => {
  const [checked, SetChecked] = useState(false);
  function handleChange() {
    SetChecked(!checked);
  }

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
              rows={15}
              cols={70}
            />
          </div>
          {/* inputi za grad br cenu i check */}
          <div className={style.Inputs}>
            <div className={style.Inputsredi}>
              <Input text="Grad" icon="location_on" onChange={() => {}} />
            </div>
            <div className={style.Inputsredi}>
              <Input text="0677676382" icon="call" onChange={() => {}} />
            </div>
            <div className={style.Inputsredi}>
              <Input text="Cena" icon="euro_symbol" onChange={() => {}} />
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
        </div>
        <div className={style.DodajMenije}>
          {/* div za naslov samo */}
          <div>
            <h2>Dodaj menije</h2>
          </div>
          {/* odje ispod je za inputi opis i plusic */}
          <div className={style.InputiOpisPlusic}>
            {/* odje ide ime menija blabla */}
            <div className={style.Kocka}>
              <div className={style.Red}>
                <div className={style.Inputsredi}>
                  <Input text="Ime menija" onChange={() => {}} />
                </div>

                <div className={style.Inputsredi}>
                  <Input text="Odaberi sliku" onChange={() => {}} />
                </div>
              </div>
              <div className={style.Red}>
                <div className={style.Inputsredi}>
                  <Input text="Cena" onChange={() => {}} />
                </div>
                <div className={style.Inputsredi}>
                  {" "}
                  <Input
                    text="Kategorija ali ne ide input "
                    onChange={() => {}}
                  />{" "}
                </div>
              </div>
            </div>
            {/* opis menija */}
            <div  className={style.Kocka}>
            <textarea
              placeholder="Opis menija"
              className={style.TxtAreaMeny}
              
            />
            
            </div>
            <div className={style.Kocka}>
                <MojButton  onClick={()=>{}} icon="add" paddingX="20px" paddingY="20px"/>
            </div>
          </div>
        </div>
      </div>
      <div className={style.NAJJACEDUGME}>
      <div className={style.SacuvajDugme}>
            <MojButton text="Sacuvaj" onClick={()=>{}} wide={true} center={true} />
      </div>
      </div>
    </div>
  );
};

export default AgencyProfile;
