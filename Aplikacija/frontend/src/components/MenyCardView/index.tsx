import { OglasObjekata } from "@/store/api/endpoints/oglas/types";
import style from "./style.module.css";
import DisplayCard from "../DisplayCard";
import MojButton from "../lib/button";
import Icon from "../lib/icon";
import { useGetMenuesQuery } from "@/store/api/endpoints/agencija";

type MenyCardProps = {
  meni: Menu;
  //meny
};
const MenyCardView = ({ meni }: MenyCardProps) => {
  return (
    <div className={style.Container}>
      <div className={style.MenyPicture}>
        <img src="/public/images/burger.jpg" />
      </div>
      <div className={style.MenyTxt}>
        <h2>{meni.naziv}</h2>
        <p>{meni && meni.opis}</p>
      
    
     
        </div>
    
        
    </div>
  );
};
export default MenyCardView;
