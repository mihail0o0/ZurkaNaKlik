import MojButton from "@/components/lib/button";
import { Autocomplete, Popover, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import style from "./style.module.css";
import { useGetAllCitiesQuery } from "@/store/api/endpoints/oglas";

// type autocompleteOptions = {
//   label: string;
// }

type Props = {
  value: string | null;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
};

const Grad = ({ value, setValue }: Props) => {
  const [inputValue, setInputValue] = useState("");

  // const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  // const [grad, setGrad] = useState("");
  // const open = Boolean(anchorEl);
  // const id = open ? "simple-popover" : undefined;
  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // TODO ODKOMENTARISI, RN NEMAM GRADOVE
  // const { data: gradovi } = useGetAllCitiesQuery();

  const gradovi = ["Nis", "Beograd", "Sombor"];

  return (
    <>
      <Autocomplete
        id="select-city"
        disablePortal
        value={value}
        onChange={(_, newVal: string | null) => {
          setValue(newVal);
        }}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={gradovi ?? []}
        sx={{
          width: 300,
         
          ".css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root": {
            borderRadius: "var(--borderRadiusMedium)",
            backgroundColor: "var(--lightGrey)",
          },
        }}
        renderInput={(params) => <TextField {...params} label="Grad" />}
      />
    </>
  );
};

// <>
//   <MojButton
//     text="Grad"
//     onClick={handleClick}
//     paddingX="30px"
//     paddingY="8px"
//     fontSize="15px"
//     icon="search"
//     backgroundColor="#d3d3d3"
//     color="black"
//   />
//   <Popover
//     id={id}
//     open={open}
//     anchorEl={anchorEl}
//     onClose={handleClose}
//     sx={{
//       "& .css-3bmhjh-MuiPaper-root-MuiPopover-paper": {
//         borderRadius: "30px",
//       },
//     }}
//     anchorOrigin={{
//       vertical: "bottom",
//       horizontal: "center",
//     }}
//     transformOrigin={{
//       vertical: "top",
//       horizontal: "center",
//     }}
//   >
//     {/*odje sad treba ceo kontent*/}
//     <div className={style.PopoverGradovi}>
//       <p>Izaberite lokaciju</p>
//       <Input icon="location_on" text={grad} onChange={setGrad} />
//       {/* ovde treba da idu gradovi iz baze */}
//       {gradovi &&
//         gradovi.map((grad) => {
//           return <div className={style.GradoviStyle}>{grad}</div>;
//         })}
//     </div>
//   </Popover>
// </>

export default Grad;
