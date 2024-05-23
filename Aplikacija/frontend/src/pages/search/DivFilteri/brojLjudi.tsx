import MojButton from "@/components/lib/button";
import Icon from "@/components/lib/icon";
import { Popover, Typography } from "@mui/material";
import { useState } from "react";
import style from "./style.module.css";

const BrojLjudi = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [broj, setBroj] = useState("");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleBroj = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBroj(event.target.value);
  };

  return (
    <div>
      <MojButton
        text="Broj ljudi"
        onClick={handleClick}
        paddingX="13px"
        paddingY="8px"
        fontSize="15px"
        icon="boy"
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
        <div className={style.CenaOd}>
          <Typography sx={{ p: 2 }}>Broj ljudi :</Typography>

          <Icon icon="boy" />
          <input
            type="number"
            id="textInput"
            value={broj}
            onChange={handleBroj}
          />
        </div>
      </Popover>
    </div>
  );
};
export default BrojLjudi;