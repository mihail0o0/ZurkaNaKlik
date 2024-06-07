import { OglasObjekata } from "@/store/api/endpoints/oglas/types";
import style from "./style.module.css";
import DisplayCard from "../DisplayCard";
import MojButton from "../lib/button";
import Icon from "../lib/icon";
import { useAcceptOrderMutation, useDeclineOrderMutation, useGetMenuesQuery } from "@/store/api/endpoints/agencija";
import { useGetOglasQuery } from "@/store/api/endpoints/oglas";
import { skipToken } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

type MenyCardProps = {
  order?: CateringOrder;
  meni?: Menu;
  //meny
};
const MenyCardPorudzbine = ({ order, meni }: MenyCardProps) => {
  const{data :oglas}=useGetOglasQuery(order?.idOglasa ?? skipToken);
  const[acceptOrder]=useAcceptOrderMutation();
  const[declineOrder]=useDeclineOrderMutation();
  const [statusRezervacije, setStatusRezervacije] = useState(order?.statusRezervacije);

  const formatDate = (date:Date) => {
    if (!(date instanceof Date)) return 'Invalid date';
    
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();

    return `${day}.${month}.${year}.`;
  };
  const accept = async () => {
    if(!order) {
      console.log("nema order");
      return;
    }
   const result = await acceptOrder(order.id);

    if ("error" in result) {
      return;
    }
    setStatusRezervacije(true);
    toast.success("Porudzbina je prihvacena!");
    
  };
  const decline = async () => {
    if(!order) {
      console.log("nema order");
      return;
    }
   const result = await declineOrder(order.id);

    if ("error" in result) {
      return;
    }
    setStatusRezervacije(false);
    toast.success("Porudzbina je odbijena!");
    
  };
  useEffect(() => {
    if (order) {
      setStatusRezervacije(order.statusRezervacije);
    }
  }, [order]);
 console.log(order);
  return (
    <div className={`containerWrapper ${style.Container}`}>
      <div className={style.MenyPicture}>
        <img src="/public/images/burger.jpg" />
      </div>
      <div className={style.MenyTxt}>
        <h3>{meni && meni.naziv}</h3>
        
        {/* <p>Opis menija neki mali./p> */}
        <div className={style.InfoOglas}>
          <div className={style.DisplayMenyInfo}>
            <>
              <Icon icon={"location_on"} />
              <label>{oglas && oglas.lokacija}</label>
              
            </>
          </div>
          <div className={style.DisplayMenyInfo}>
            <>
              <Icon icon={"calendar_month"} />
              <label>{order?.datumRezervacije && order.datumRezervacije}</label>
            </>
          </div>
        </div>
        <div className={style.InfoOglas}>
          <div className={style.DisplayMenyInfo}>
            <Icon icon={"house"} />
            <label>{oglas && oglas.naziv}</label>
          </div>
          <div className={style.DisplayMenyInfo}>
            <Icon icon={"payments"} />
            <label>{order?.konacnaCena}</label>{" "}
          </div>
        </div>
      </div>
     {!order?.statusRezervacije &&
     
     <div className={style.acceptDecline}>
        <div className={style.ButtonParentDiv}>
          <MojButton
            icon="check"
            text="Prihvati"
            backgroundColor="#00D615"
            wide={true}
            onClick={accept}
          />
        </div>
        <div className={style.ButtonParentDiv}>
          <MojButton
            icon="cancel"
            text="Odbij"
            backgroundColor="#FA3636"
            wide={true}
            onClick={decline}
          />
        </div>
      </div>}
    </div>
  );
};
export default MenyCardPorudzbine;
