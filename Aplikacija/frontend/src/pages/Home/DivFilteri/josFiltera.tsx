import React, { useState } from "react";
import { Checkbox, Dialog, DialogTitle, FormControlLabel } from "@mui/material";
import style from "./style.module.css";
import {
  EnumDodatnaOprema,
  EnumGrejanje,
  EnumTipProstora,
  dodatnaOpremaMap,
  tipGrejanjaMap,
  tipProstoraMap,
} from "@/store/api/endpoints/oglas/types";
import { pink } from "@mui/material/colors";

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const getEnumGrejanje = (value: EnumGrejanje): string => {
    switch (value) {
      case EnumGrejanje.Etazno:
        return "Etažno";
      case EnumGrejanje.Klima:
        return "Klima";
      case EnumGrejanje.Kotao:
        return "Kotao";
      case EnumGrejanje.Sporet:
        return "Šporet";
      case EnumGrejanje.TA_pec:
        return "TA peć";
      case EnumGrejanje.Nema:
        return "Nema";
      default:
        return "";
    }
  };
  const getEnumTipProstora = (value: EnumTipProstora): string => {
    switch (value) {
      case EnumTipProstora.Vikendica:
        return "Vikendica";
      case EnumTipProstora.Stan:
        return "Stan";
      case EnumTipProstora.Lokal:
        return "Lokal";
      case EnumTipProstora.Kuca:
        return "Kuca";
      default:
        return "";
    }
  };
  const getEnumDodatnaOprema = (value: EnumDodatnaOprema): string => {
    switch (value) {
      case EnumDodatnaOprema.net:
        return "Internet";
      case EnumDodatnaOprema.tv:
        return "Televizor";
      case EnumDodatnaOprema.terasa:
        return "Terasa";
      case EnumDodatnaOprema.bazen:
        return "Bazen";
      case EnumDodatnaOprema.klima:
        return "Klima uređaj";
      case EnumDodatnaOprema.kuhinja:
        return "Kuhinja";
      case EnumDodatnaOprema.dvoriste:
        return "Dvorište";
      case EnumDodatnaOprema.parking:
        return "Parking";
      case EnumDodatnaOprema.frizider:
        return "Frižider";
      case EnumDodatnaOprema.zamrzivac:
        return "Zamrzivač";
      default:
        return "";
    }
  };

  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{ width: "100%", borderRadius: "30px", padding: "15px" }}
    >
      <DialogTitle>Izaberite jos filtera</DialogTitle>

      <div className={style.Tip}>
        <h3>Izaberite dodatnu opremu</h3>
        <div className={style.TipContainer}>
          {Object.values(EnumDodatnaOprema)
            .filter((value) => typeof value === "number") 
            .map((key) => {
              const enumKey = key as EnumDodatnaOprema; 
              return (
                <div className={style.JedanChk} key={enumKey}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          color: pink[800],
                          "&.Mui-checked": {
                            color: pink[600],
                          },
                        }}
                      />
                    }
                    label={dodatnaOpremaMap[enumKey]}
                  />
                </div>
              );
            })}
        </div>
      </div>
      <div className={style.Tip}>
        <h3>Tipovi prostora</h3>
        <div className={style.TipContainer}>
        {Object.values(EnumTipProstora)
            .filter((value) => typeof value === "number") 
            .map((key) => {
              const enumKey = key as EnumTipProstora; 
              return (
                <div className={style.JedanChk} key={enumKey}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          color: pink[800],
                          "&.Mui-checked": {
                            color: pink[600],
                          },
                        }}
                      />
                    }
                    label={tipProstoraMap[enumKey]}
                  />
                </div>
              );
            })}
        </div>
      </div>
      <div className={style.Tip}>
        <h3>Grejanje</h3>
        <div className={style.TipContainer}>
        {Object.values(EnumGrejanje)
            .filter((value) => typeof value === "number") 
            .map((key) => {
              const enumKey = key as EnumGrejanje; 
              return (
                <div className={style.JedanChk} key={enumKey}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          color: pink[800],
                          "&.Mui-checked": {
                            color: pink[600],
                          },
                        }}
                      />
                    }
                    label={tipGrejanjaMap[enumKey]}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </Dialog>
  );
}

const JosFiltera = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    console.log(value);
    setOpen(false);
  };
  return (
    <div>
      <div className={style.JosFiltera} onClick={handleClickOpen}>
        <img src="../public/images/page_info.png" alt="Page Info" />
        <p>Još filtera</p>
      </div>
      <SimpleDialog open={open} selectedValue="default" onClose={handleClose} />
    </div>
  );
};

export default JosFiltera;
