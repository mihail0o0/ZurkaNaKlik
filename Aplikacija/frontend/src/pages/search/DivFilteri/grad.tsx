import MojButton from "@/components/lib/button";
import { Popover } from "@mui/material";
import { useState } from "react";
import style from "./style.module.css";
import Input from "@/components/lib/inputs/text-input";
import { useGetAllCitiesQuery } from "@/store/api/endpoints/oglas";
const Grad = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [grad,setGrad]=useState("");
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  const {data: gradovi}=useGetAllCitiesQuery();
  {gradovi &&  gradovi.filter(grad =>
    grad.toLowerCase().includes(grad.toLowerCase())
  );}

  return (
    <>
    <MojButton
      text="Grad"
      onClick={handleClick}
      paddingX="13px"
      paddingY="8px"
      fontSize="15px"
      icon="search"
      backgroundColor="#d3d3d3"
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
        {/*odje sad treba ceo kontent*/}
        <div className={style.PopoverGradovi}>
          <p>Izaberite lokaciju</p>
          <Input icon="location_on" text={grad} onChange={setGrad}/>
          {/* ovde treba da idu gradovi iz baze */}
           { gradovi &&  gradovi.map((grad)=>{
            return <div className={style.GradoviStyle}>{grad}</div>
          })}
        </div>
      </Popover>
      </>

  );
};
export default Grad;
