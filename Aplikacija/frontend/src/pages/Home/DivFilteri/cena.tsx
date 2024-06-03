import MojButton from "@/components/lib/button";
import { Popover, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import style from "./style.module.css";
import Icon from "@/components/lib/icon";

type Props = {
  cenaOd: string;
  cenaDo: string;
  setCenaOd: React.Dispatch<React.SetStateAction<string>>;
  setCenaDo: React.Dispatch<React.SetStateAction<string>>;
};

const Cena = ({ cenaOd, cenaDo, setCenaOd, setCenaDo }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleCenaOd = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCenaOd(event.target.value);
  };
  const handleCenaDo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCenaDo(event.target.value);
  };

  return (
    <div>
      <MojButton
        text="Cena"
        onClick={handleClick}
        paddingX="80px"
        paddingY="14px"
        fontSize="15px"
        icon="payments"
        grey={true}
        color="black"
        wide={true}
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
      
          <div className={style.CenaOd}>
            <Typography sx={{ p: 2 }}>Od :</Typography>

            <Icon icon="payments" />

            <input
              type="number"
              id="textInput"
              value={cenaOd}
              onChange={handleCenaOd}
            />
          </div>
          <div className={style.CenaOd}>
            <Typography sx={{ p: 2 }}>Do :</Typography>

            <Icon icon="payments" />
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
