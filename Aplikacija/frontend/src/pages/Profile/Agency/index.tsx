import Input from "@/components/lib/inputs/text-input";
import style from "./style.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import MojButton from "@/components/lib/button";
import DodajIzmeniMeni from "./DodajMeni";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetAgencyDataQuery,
  useGetAllCategoriesQuery,
  useGetMenuesQuery,
  useUpdateAgencyDataMutation,
} from "@/store/api/endpoints/agencija";
import { Chip, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/auth";
import { updateAgencySchema } from "@/utils/validators";
import { getMessage } from "@reduxjs/toolkit/dist/actionCreatorInvariantMiddleware";
import { getValidationMessage } from "@/utils/validationMessage";
import { toast } from "react-toastify";
import { skipToken } from "@reduxjs/toolkit/query";
import UserAvatar from "@/components/UserAvatar";
import PageSpacer from "@/components/lib/page-spacer";

const AgencyProfile = () => {
  const currUser = useSelector(selectUser);

  const { data: agencyData } = useGetAgencyDataQuery(currUser?.id ?? skipToken);

  const { data: menues } = useGetMenuesQuery();
  const { data: kategorije } = useGetAllCategoriesQuery();

  const [updateAgency] = useUpdateAgencyDataMutation();
  const [deleteAgency] = useDeleteCategoryMutation();

  useEffect(() => {
    if (!agencyData) return;

    setImeAgencije(agencyData.ime ?? "");
    setOpisAgencije(agencyData.opis ?? "");
    setGrad(agencyData.lokacija);
    setBroj(agencyData.brTel);
    if (agencyData.mogucnostDostave) {
      setCenaAgencija(String(agencyData.cenaDostave));
    }
    SetChecked(agencyData.mogucnostDostave);
  }, [agencyData]);

  const [imeAgencije, setImeAgencije] = useState("");
  const [opisAgencije, setOpisAgencije] = useState("");
  const [grad, setGrad] = useState("");
  const [broj, setBroj] = useState("");
  const [cenaAgencija, setCenaAgencija] = useState("");
  const [checked, SetChecked] = useState(false);

  const [imeKategorije, setImeKategorije] = useState<string>("");

  const [addCategory] = useAddCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const submit = async () => {
    if (!agencyData) {
      console.log("agencija ne postoji");
      return;
    }

    const novaAgencija: UpdateAgencyDTO = {
      ime: imeAgencije,
      brTel: broj,
      cenaDostave: parseInt(cenaAgencija),
      lokacija: grad,
      mogucnostDostave: checked,
      opis: opisAgencije,
      brojOcena: agencyData.brojOcena,
      email: agencyData.email,
      id: agencyData.id,
    };

    const valResult = updateAgencySchema.validate(novaAgencija);

    if (valResult.error) {
      const [type, msg] = getValidationMessage(valResult);

      console.log(msg);
      toast.error(msg);
      return;
    }

    const result = await updateAgency(novaAgencija);

    if ("error" in result) {
      return;
    }

    toast.success("Profil agencije uspesno izmenjena!");
  };

  const handleChange = () => {
    if (checked) setCenaAgencija("");
    SetChecked(!checked);
  };

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
    console.log("Jao");
  };

  if (!currUser) {
    return null;
  }

  return (
    <>
      <PageSpacer variant="xs" />
      <div className={`containerWrapper ${style.Glavni}`}>
        <div className={style.Gore}>
          {/* DIV TXT */}
          <div className={style.Heading}>
            <div className={style.HeadingText}>
              <h1> Postavke agencije</h1>
              <p className={style.Paragraf}>
                {" "}
                Dodajte opis i ostale podatke, i podesite kategorije menija koje
                posedujete, kao i individualne menije iza svake kategorije.
              </p>
            </div>
            <div className={style.AvatarText}>
              <UserAvatar size={100} letter={currUser.name[0]} />
              <Typography fontSize={24}>{currUser.name}</Typography>
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
              <Input
                text={imeAgencije}
                placeholder="Ime"
                icon="edit"
                onChange={setImeAgencije}
              />
              <Input
                text={grad}
                placeholder="Grad"
                icon="location_on"
                onChange={setGrad}
              />
              <Input
                placeholder="Broj Telefona"
                text={broj}
                icon="call"
                onChange={setBroj}
              />
              <Input
                text={cenaAgencija}
                placeholder="Cena"
                icon="euro_symbol"
                onChange={setCenaAgencija}
                disabled={!checked}
              />
              <label>
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
                      key={`Chip-${kategorija.id}`}
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
              <Input
                text={imeKategorije}
                placeholder="Ime Kategorije"
                onChange={setImeKategorije}
              />
              <MojButton
                icon="add"
                onClick={dodajNovuKategoriju}
                paddingY="10px"
              />
            </div>
          </div>
          <div className={style.DodajMenije}>
            <h2>Dodaj menije</h2>
            <DodajIzmeniMeni kategorije={kategorije} />
          </div>
        </div>
        <div className={style.NAJJACEDUGME}>
          <div className={style.SacuvajDugme}>
            <MojButton
              text="Sacuvaj"
              onClick={submit}
              wide={true}
              center={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AgencyProfile;
