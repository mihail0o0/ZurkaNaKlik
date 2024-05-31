import MojButton from "@/components/lib/button";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
const FavoriteOglasi=()=>{
    const navigate = useNavigate();
    return(
        <div className={`containerWrapper ${style.Glavni}`}>
            <div className={style.Div222}>
           <div className={style.TxtDiv}>
                <h2>Vasi omiljeni oglasi</h2>
           </div>
           </div>
           {/* odje idu kartice sa omiljenim oglasima */}
           <div className={style.OmiljeniOglasi}>
                <p>da se dodaju omiljeniiiii</p>
           </div>
           <div  className={style.Div222}>
            <div className={style.TxtDiv}>
                <MojButton text="Pretrazite jos oglasa" onClick={() => {
                navigate('/search');
              }} wide={true} center={true}/>
            </div>
           </div>

        </div>
    )
}
export default FavoriteOglasi;