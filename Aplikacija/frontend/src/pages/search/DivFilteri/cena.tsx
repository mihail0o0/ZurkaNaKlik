import MojButton from "@/components/lib/button";
import { Popover, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import style from "./style.module.css";
import Icon from "@/components/lib/icon";

const Cena = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [cenaOd, setCenaOd] = useState("");
  const [cenaDo, setCenaDo] = useState("");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleCenaOd = (event : React.ChangeEvent<HTMLInputElement>) => {
    setCenaOd(event.target.value);
  };
  const handleCenaDo = (event : React.ChangeEvent<HTMLInputElement>) => {
    setCenaDo(event.target.value);
  };

  return (
    <div>
      <MojButton
        text="Cena"
        onClick={handleClick}
        paddingX="13px"
        paddingY="8px"
        fontSize="15px"
        icon="euro_symbol"
        backgroundColor="#d3d3d3"
        color="black"
        wide="20%"
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{
            "& .css-3bmhjh-MuiPaper-root-MuiPopover-paper": {
                borderRadius: "30px",
            
              },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
        <div className={style.CenaVelikiDiv}>
          <div>
            {" "}
            <Typography sx={{ p: 2 }}>Cena :</Typography>{" "}
          </div>
          <div className={style.CenaOd}>
            <Typography sx={{ p: 2 }}>Od :</Typography>
            
              <Icon icon="euro_symbol" />
              <input
                type="number"
                id="textInput"
                value={cenaOd}
                onChange={handleCenaOd}
              />
            
          </div>
          <div className={style.CenaOd}>
            <Typography sx={{ p: 2 }}>Do :</Typography>
           
              <Icon icon="euro_symbol" />
              <input
              
                type="number"
                id="textInput"
                value={cenaDo}
                onChange={handleCenaDo}
                
              />
            
          </div>
        </div>
      </Popover>
    </div>
  );
};
export default Cena;
