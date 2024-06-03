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
import { stringToEnum } from "@/utils/enumMappings";

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const [selectedDodatnaOprema, setSelectedDodatnaOprema] = useState<number[]>(
    []
  );

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  const handleChange = (value: string) => {
    const type = stringToEnum(value, dodatnaOpremaMap);
    if (type == undefined || type == null) return;

    const set = new Set(selectedDodatnaOprema);
    if (set.has(type)) {
      set.delete(type);
    } else {
      set.add(type);
    }

    setSelectedDodatnaOprema(Array.from(set));
  };

  console.log(selectedDodatnaOprema);

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
          {Object.values(dodatnaOpremaMap).map((key) => {
            return (
              <div className={style.JedanChk} key={key}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={key}
                      onChange={() => handleChange(key)}
                      sx={{
                        color: pink[800],
                        "&.Mui-checked": {
                          color: pink[600],
                        },
                      }}
                    />
                  }
                  label={key}
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
        <img src="/images/page_info.png" alt="Page Info" />
        <p>Još filtera</p>
      </div>
      <SimpleDialog open={open} selectedValue="default" onClose={handleClose} />
    </div>
  );
};

export default JosFiltera;
