import { Autocomplete, Checkbox, TextField } from "@mui/material";
import style from "./style.module.css";
import { useGetAllCategoriesQuery } from "@/store/api/endpoints/pregled";
import Grad from "@/pages/Home/DivFilteri/grad";
import { useGetAllCitiesQuery } from "@/store/api/endpoints/oglas";
import { useState } from "react";
import PopupRange from "@/pages/Home/DivFilteri/popupRange";
import MojButton from "@/components/lib/button";

const Filters = () => {
  const { data: allCategories } = useGetAllCategoriesQuery();
  const { data: allCities } = useGetAllCitiesQuery();
  const [city, setCity] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [cenaOd, setCenaOd] = useState("");
  const [cenaDo, setCenaDo] = useState("");

  const [mogucnostDostave, setMogucnostDostave] = useState(true);

  const handleMogucnostDostaveChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMogucnostDostave(event.target.checked);
  };

  return (
    <>
      <div className={style.backgroundImage}>
        <div className={style.filtersWrapper}>
          <div className={style.content}>
            <h2>Pronadjite savršeni ketering!</h2>
            <p>
              Dobrodošli na našu platformu gde možete jednostavno naručiti
              vrhunski ketering za vašu žurku! Kod nas ćete pronaći sve što vam
              je potrebno za savršeno gastronomsko iskustvo.
            </p>
          </div>
          <div className={style.filtersContainer}>
            <div className={style.filters}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={allCategories || []}
                getOptionLabel={(option) => option.naziv}
                renderInput={(params) => (
                  <TextField {...params} label="Kategorije" />
                )}
                sx={{
                  width: "300px",
                  ".css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root": {
                    borderRadius: "var(--borderRadiusMedium)",
                    backgroundColor: "var(--lightGrey)",
                  },
                }}
              />
              <Grad value={city} setValue={setCity}></Grad>
              <PopupRange
                icon="payments"
                inputText="Cena Dostave"
                from={cenaOd}
                to={cenaDo}
                setFrom={setCenaOd}
                setTo={setCenaDo}
                disabled={!mogucnostDostave}
              />
              <MojButton
                text="Pretraži"
                onClick={() => {}}
                paddingX="50px"
                paddingY="10px"
              />
            </div>
            <div className={style.mogucnostDostave}>
              <Checkbox
                checked={mogucnostDostave}
                onChange={handleMogucnostDostaveChange}
              />

              <label>Mogućnost dostave</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
