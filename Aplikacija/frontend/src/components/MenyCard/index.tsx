import { OglasObjekata } from "@/store/api/endpoints/oglas/types";
import style from "./style.module.css";
import DisplayCard from "../DisplayCard";
import MojButton from "../lib/button";


type MenyCardProps={
    oglas?: OglasObjekata;
    //meny
    
}
const MenyCard= ({oglas}:MenyCardProps)=>{
    return(
         <div className={`containerWrapper ${style.Container}`}>
            <div className={style.MenyPicture}>
                <img src="/public/images/burger.jpg"/>
            </div>
            <div className={style.MenyTxt}>
                <h3>Burger king</h3>
                <p>Opis menija neki mali.</p>
                <div className={style.InfoOglas}>
                    <DisplayCard text={"Trg 14. oktobra 6"} icon={"location_on"} />
                    <DisplayCard text={"Vila ramonda"} icon={"house"}/>
                    <DisplayCard text={"Mihailo Petrovic"} icon={"edit"}/>
                </div>
            </div>
            <div className={style.acceptDecline}>
                <div className={style.ButtonParentDiv}>
                    
                        <MojButton icon="check" text="Prihvati" backgroundColor="#00D615" wide={true}/>
                   
                </div>
                <div className={style.ButtonParentDiv}>
                    
                        <MojButton icon="cancel" text="Odbij" backgroundColor="#FA3636" wide={true}/>
                    
                </div>

            </div>
    </div>
   )
}
export default MenyCard;