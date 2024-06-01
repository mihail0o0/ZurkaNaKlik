import MojButton from "@/components/lib/button";
import style from "./style.module.css";
import { ChangeEvent, useState } from "react";
import Input from "@/components/lib/inputs/text-input";
import { Chip, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import {
  EnumDodatnaOprema,
  EnumGrejanje,
  EnumTipProslava,
  EnumTipProstora,
  getEnumDodatnaOprema,
  getEnumGrejanje,
  getEnumTipProslava,
  getEnumTipProstora,
} from "@/store/api/endpoints/oglas/types";

const OglasiProstor = () => {
  const [opisProstora, setOpisProstora] = useState("");
  function updateOpisProstora(event: ChangeEvent<HTMLTextAreaElement>) {
    setOpisProstora(event.target.value);
  }
  const [grejanje, setGrejanje] = useState("");
  const [naziv, setNaziv] = useState("");
  const [brojTelefona, setBrojTelefona] = useState("");
  const [grad, setGrad] = useState("");
  const [adresa, setAdresa] = useState("");
  const [cenaDan, setCenaDan] = useState("");
  const [kvadratura, setKvadratura] = useState("");
  const [brojSoba, setBrojSoba] = useState("");
  const [brojKreveta, setBrojKreveta] = useState("");
  const [brojKupatila, setBrojKupatila] = useState("");

  const handleChangeGrejanje = (event: SelectChangeEvent) => {
    setGrejanje(event.target.value);
  };

  return (
    <div className={`containerWrapper ${style.Glavni}`}>
      <div className={style.Txt}>
        <div>
          <h2>Oglasite prostor za izdavanje</h2>
        </div>
        <div className={style.TxtDodaj}>
          <p>
            Dodajte sve validne podatke za Vas prostor, kako bi korisnicima dali
            sto siru sliku prostora kojeg izdajete.
          </p>
        </div>
      </div>
      <div>{/* ovde idu slike  */}</div>
      <div className={style.NAJJACEDUGME}>
        <div className={style.DodajSLikuDugme}>
          <MojButton
            text="Dodaj sliku"
            icon="add_photo_alternate"
            backgroundColor="lightgrey"
            color="black"
            wide={true}
            center={true}
          />
        </div>
      </div>
      <div className={style.OpisiProstora}>
        {/* opisi */}
        <div className={style.KolonaTxtArea}>
          <textarea
            placeholder="Opis prostora"
            className={style.TxtArea}
            onChange={updateOpisProstora}
            value={opisProstora}
          />
        </div>
        <div className={style.KolonaTxtArea}>
          <div>
            <Input text="Naziv" icon="house" onChange={setNaziv} />
          </div>
          <div>
            <Input
              text="Broj telefona"
              icon="call"
              onChange={setBrojTelefona}
            />
          </div>
          <div>
            <Input text="Grad" icon="location_on" onChange={setGrad} />
          </div>
          <div>
            <Input text="Adresa" icon="location_on" onChange={setAdresa} />
          </div>
          <div>
            <Input
              text="Cena po danu"
              icon="euro_symbol"
              onChange={setCenaDan}
            />
          </div>
          <div>
            <Input
              text="Kvadratura"
              icon="view_in_ar"
              onChange={setKvadratura}
            />
          </div>
          <div>
            <Input text="Broj soba" icon="chair" onChange={setBrojSoba} />
          </div>
          <div>
            <Input text="Broj kreveta" icon="bed" onChange={setBrojKreveta} />
          </div>
          <div>
            <Input
              text="Broj kupatila"
              icon="bathroom"
              onChange={setBrojKupatila}
            />
          </div>
          <div>
            <Select
              value={grejanje}
              label="Grejanje"
              placeholder="Grejanje"
              onChange={handleChangeGrejanje}
              sx={{
                width: "100%",
                borderRadius: "12px",
              }}
            >
              {Object.keys(EnumGrejanje)
                .filter((key) => isNaN(Number(key)))
                .map((key) => {
                  const value = EnumGrejanje[key as keyof typeof EnumGrejanje];
                  return (
                    <div className={style.JedanChip}>
                      <MenuItem value={getEnumGrejanje(value)}>
                        {getEnumGrejanje(value)}
                      </MenuItem>
                    </div>
                  );
                })}
            </Select>
          </div>
        </div>
      </div>
      <div className={style.TipoviProslava}>
        {/* tipovi proslava koje dozvoljavate */}
        <div>
          <h3>Tipovi proslava koje dozvoljavate</h3>
        </div>
        <div className={style.ChipProslave}>
          {/* ovde treba da se doda za delete */}
          {Object.keys(EnumTipProslava)
            .filter((key) => isNaN(Number(key)))
            .map((key) => {
              const value =
                EnumTipProslava[key as keyof typeof EnumTipProslava];
              return (
                <div className={style.JedanChip}>
                  <Chip
                    label={getEnumTipProslava(value as EnumTipProslava)}
                    variant="outlined"
                    onClick={() => {}}
                    onDelete={() => {}}
                    sx={{
                      width: "100%",
                      borderRadius: "20px",
                      height: "40px",
                      color: "black",
                    }}
                  />
                </div>
              );
            })}
        </div>
      </div>
      {/* tipovi prostora u koje vas oglas pripada */}
      <div>
        <div className={style.TipoviProslava}>
          <h3>Tipovi prostora u koje Vas oglas pripada</h3>
          <div className={style.ChipProslave}>
            {Object.keys(EnumTipProstora)
              .filter((key) => isNaN(Number(key))) // Filtriramo samo string ključeve
              .map((key) => {
                const value =
                  EnumTipProstora[key as keyof typeof EnumTipProstora];
                return (
                  <div className={style.JedanChip}>
                    <Chip
                      label={getEnumTipProstora(value as EnumTipProstora)}
                      variant="outlined"
                      onClick={() => {}}
                      onDelete={() => {}}
                      sx={{
                        width: "100%",
                        borderRadius: "20px",
                        height: "40px",
                        color: "black",
                      }}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {/* dodatna oprema */}
      <div>
        <div className={style.TipoviProslava}>
          <h3>Dodatna oprema koju poseduje Vas prostor</h3>
          <div className={style.ChipProslave}>
            {Object.values(EnumDodatnaOprema)
              .filter((value) => typeof value === "number") // Filtriramo samo numeričke vrednosti
              .map((value) => (
                <div className={style.JedanChip}>
                  <Chip
                    label={getEnumDodatnaOprema(value as EnumDodatnaOprema)}
                    variant="outlined"
                    onClick={() => {}}
                    onDelete={() => {}}
                    sx={{
                      width: "100%",
                      borderRadius: "20px",
                      height: "40px",
                      color: "black",

                    }}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className={style.NAJJACEDUGME}>
        <div className={style.dodajOglasDugme}>
          <MojButton
            text="Dodajte oglas"
            center={true}
            wide={true}
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};
export default OglasiProstor;
