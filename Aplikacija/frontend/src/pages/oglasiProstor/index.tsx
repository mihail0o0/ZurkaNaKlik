import MojButton from "@/components/lib/button";
import style from "./style.module.css";
import { ChangeEvent, useState } from "react";
import Input from "@/components/lib/inputs/text-input";
import {
  Chip,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  SxProps,
  Theme,
} from "@mui/material";
import {
  AddOglasObjektaDTO,
  EnumDodatnaOprema,
  EnumGrejanje,
  EnumTipProslava,
  EnumTipProstora,
  dodatnaOpremaMap,
  tipGrejanjaMap,
  tipProslavaMap,
  tipProstoraMap,
} from "@/store/api/endpoints/oglas/types";
import Icon from "@/components/lib/icon";
import { enumToString, stringToEnum } from "@/utils/enumMappings";
import { useAddUserOglasMutation } from "@/store/api/endpoints/oglas";
import { addUserOglasSchema } from "@/utils/validators";
import { toast } from "react-toastify";
import { getValidationMessage } from "@/utils/validationMessage";
import { useNavigate } from "react-router-dom";

const OglasiProstor = () => {
  const [opisProstora, setOpisProstora] = useState("");

  const [grejanje, setGrejanje] = useState("");
  const [naziv, setNaziv] = useState("Naziv prostora");
  const [brojTelefona, setBrojTelefona] = useState("Broj telefona");
  const [grad, setGrad] = useState("Grad");
  const [adresa, setAdresa] = useState("Adresa");
  const [cenaDan, setCenaDan] = useState("Cena po danu");
  const [kvadratura, setKvadratura] = useState("Kvadratura");
  const [brojSoba, setBrojSoba] = useState("Broj soba");
  const [brojKreveta, setBrojKreveta] = useState("Broj kreveta");
  const [brojKupatila, setBrojKupatila] = useState("Broj kupatila");

  const [selectedTipoviProslava, setSelectedTipoviProslava] = useState<
    number[]
  >([]);
  const [selectedTipoviProstora, setSelectedTipoviProstora] = useState<
    number[]
  >([]);
  const [selectedDodatnaOprema, setSelectedDodatnaOprema] = useState<number[]>(
    []
  );

  const [addUser] = useAddUserOglasMutation();
  const navigate = useNavigate();

  const handleChangeGrejanje = (event: SelectChangeEvent) => {
    setGrejanje(event.target.value);
  };

  function updateOpisProstora(event: ChangeEvent<HTMLTextAreaElement>) {
    setOpisProstora(event.target.value);
  }

  const handleTipProslavaChange = (value: string) => {
    const selected = stringToEnum(value, tipProslavaMap);
    if (selected == undefined) return;

    const tipoviSet = new Set(selectedTipoviProslava);
    if (tipoviSet.has(selected)) {
      tipoviSet.delete(selected);

      if(tipoviSet.has(EnumTipProslava.Sve)){
        tipoviSet.delete(EnumTipProslava.Sve);
      }
    } else {
      tipoviSet.add(selected);

      if (tipoviSet.has(EnumTipProslava.Sve)) {
        Object.values(EnumTipProslava).forEach((element) => {
          if (typeof element !== "number") return;
          tipoviSet.add(element);
        });
      }
    }

    setSelectedTipoviProslava(Array.from(tipoviSet));
  };

  const handleTipProstoraChange = (value: string) => {
    const selected = stringToEnum(value, tipProstoraMap);
    if (selected == undefined) return;

    const tipoviSet = new Set(selectedTipoviProstora);
    if (tipoviSet.has(selected)) {
      tipoviSet.delete(selected);
    } else {
      tipoviSet.add(selected);
    }

    setSelectedTipoviProstora(Array.from(tipoviSet));
  };

  const handleDodatnaOpremaChange = (value: string) => {
    const selected = stringToEnum(value, dodatnaOpremaMap);
    if (selected == undefined) return;

    const tipoviSet = new Set(selectedDodatnaOprema);
    if (tipoviSet.has(selected)) {
      tipoviSet.delete(selected);
    } else {
      tipoviSet.add(selected);
    }

    setSelectedDodatnaOprema(Array.from(tipoviSet));
  };

  function getChipSx<T extends string>(
    value: T,
    enumMap: { [key in T]: string },
    selected: number[]
  ): SxProps<Theme> {
    const defaultSx: SxProps<Theme> = {
      width: "100%",
      borderRadius: "12px",
      height: "40px",
      color: "var(--lightText)",
      border: "1px solid var(--lightText)",
    };

    const selectedSx: SxProps<Theme> = {
      width: "100%",
      borderRadius: "12px",
      height: "40px",
      color: "black",
      border: "1px solid black",
    };

    const item = stringToEnum(value, enumMap);
    if (item == undefined) return defaultSx;
    if (selected.indexOf(item) == -1) {
      return defaultSx;
    }

    return selectedSx;
  }

  function isSelected<T extends string>(
    value: T,
    enumMap: { [key in T]: string },
    selected: number[]
  ): boolean {
    const item = stringToEnum(value, enumMap);
    if (item == undefined) return false;
    if (selected.indexOf(item) == -1) {
      return false;
    }

    return true;
  }

  const submit = async () => {
    const tipGrejanja = stringToEnum(grejanje, tipGrejanjaMap);
    if (tipGrejanja == undefined) {
      toast.error("Tip grejanja nije validan");
      return;
    }

    const oglasObject: AddOglasObjektaDTO = {
      listaTipProslava: selectedTipoviProslava,
      listaTipProstora: selectedTipoviProstora,
      listDodatneOpreme: selectedDodatnaOprema,
      grejanje: tipGrejanja,
      brojKreveta: parseInt(brojKreveta),
      brojKupatila: parseInt(brojKupatila),
      brojSoba: parseInt(brojSoba),
      kvadratura: parseInt(kvadratura),
      ocena: 0,
      brojOcena: 0,
      brTel: brojTelefona,
      cenaPoDanu: parseInt(cenaDan),
      grad: grad,
      lokacija: adresa,
      naziv: naziv,
      opis: opisProstora,
      slike: [],
    };

    const validation = addUserOglasSchema.validate(oglasObject);
    if (validation.error) {
      const [type, msg] = getValidationMessage(validation);
      toast.error(`Polje ${msg}`);
    }

    const response = await addUser(oglasObject);
    if ("error" in response) {
      return;
    }

    toast.success("Oglas uspesno dodat");

    navigate("/user/profile");
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
            <Input text={naziv} icon="house" onChange={setNaziv} />
          </div>
          <div>
            <Input
              text={brojTelefona}
              icon="call"
              onChange={setBrojTelefona}
            />
          </div>
          <div>
            <Input text={grad} icon="location_on" onChange={setGrad} />
          </div>
          <div>
            <Input text={adresa} icon="location_on" onChange={setAdresa} />
          </div>
          <div>
            <Input
              text={cenaDan}
              icon="euro_symbol"
              onChange={setCenaDan}
            />
          </div>
          <div>
            <Input
              text={kvadratura}
              icon="view_in_ar"
              onChange={setKvadratura}
            />
          </div>
          <div>
            <Input text={brojSoba} icon="chair" onChange={setBrojSoba} />
          </div>
          <div>
            <Input text={brojKreveta} icon="bed" onChange={setBrojKreveta} />
          </div>
          <div>
            <Input
              text={brojKupatila}
              icon="bathroom"
              onChange={setBrojKupatila}
            />
          </div>
          <div>
            {/* // TODO stavi label na ovaj mrtvi select */}
            <Select
              id="select-tip-grejanja"
              value={grejanje ?? ""}
              onChange={handleChangeGrejanje}
              sx={{
                width: "100%",
                borderRadius: "12px",
                color: "black",
              }}
            >
              {Object.values(tipGrejanjaMap).map((value) => {
                return (
                  <MenuItem key={`Select-${value}`} value={value}>
                    {value}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
        </div>
      </div>

      <div className={style.TipoviProslava}>
        <div>
          <h3>Tipovi proslava koje dozvoljavate</h3>
        </div>
        <div className={style.ChipProslave}>
          {Object.values(tipProslavaMap).map((value) => {
            return (
              <div className={style.JedanChip}>
                <Chip
                  label={value}
                  variant="outlined"
                  onClick={() => handleTipProslavaChange(value)}
                  onDelete={() => handleTipProslavaChange(value)}
                  deleteIcon={
                    isSelected(
                      value,
                      tipProslavaMap,
                      selectedTipoviProslava
                    ) ? undefined : (
                      <Icon
                        classes={style.addIcon}
                        fontSize="23px"
                        icon="add_circle"
                      />
                    )
                  }
                  sx={getChipSx(value, tipProslavaMap, selectedTipoviProslava)}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <div className={style.TipoviProslava}>
          <h3>Tipovi prostora u koje Vas oglas pripada</h3>
          <div className={style.ChipProslave}>
            {Object.values(tipProstoraMap).map((value) => {
              return (
                <div className={style.JedanChip}>
                  <Chip
                    label={value}
                    variant="outlined"
                    onClick={() => handleTipProstoraChange(value)}
                    onDelete={() => handleTipProstoraChange(value)}
                    deleteIcon={
                      isSelected(
                        value,
                        tipProstoraMap,
                        selectedTipoviProstora
                      ) ? undefined : (
                        <Icon
                          classes={style.addIcon}
                          fontSize="23px"
                          icon="add_circle"
                        />
                      )
                    }
                    sx={getChipSx(
                      value,
                      tipProstoraMap,
                      selectedTipoviProstora
                    )}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <div className={style.TipoviProslava}>
          <h3>Dodatna oprema koju poseduje Vas prostor</h3>
          <div className={style.ChipProslave}>
            {Object.values(dodatnaOpremaMap).map((value) => (
              <div className={style.JedanChip}>
                <Chip
                  label={value}
                  variant="outlined"
                  onClick={() => handleDodatnaOpremaChange(value)}
                  onDelete={() => handleDodatnaOpremaChange(value)}
                  deleteIcon={
                    isSelected(
                      value,
                      dodatnaOpremaMap,
                      selectedDodatnaOprema
                    ) ? undefined : (
                      <Icon
                        classes={style.addIcon}
                        fontSize="23px"
                        icon="add_circle"
                      />
                    )
                  }
                  sx={getChipSx(value, dodatnaOpremaMap, selectedDodatnaOprema)}
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
            onClick={submit}
          />
        </div>
      </div>
    </div>
  );
};
export default OglasiProstor;
