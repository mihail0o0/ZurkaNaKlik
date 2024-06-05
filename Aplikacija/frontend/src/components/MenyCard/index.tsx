import { OglasObjekata } from "@/store/api/endpoints/oglas/types";
import style from "./style.module.css";
import DisplayCard from "../DisplayCard";
import MojButton from "../lib/button";
import Icon from "../lib/icon";
import { useGetMenuesQuery } from "@/store/api/endpoints/agencija";

type MenyCardProps = {
  order?: CateringOrder;
  meni?: Menu;
  //meny
};
const MenyCard = ({ order, meni }: MenyCardProps) => {
  return (
    <div className={`containerWrapper ${style.Container}`}>
      <div className={style.MenyPicture}>
        <img src="/public/images/burger.jpg" />
      </div>
      <div className={style.MenyTxt}>
        <h3>{}</h3>
        {/* <p>Opis menija neki mali.</p> */}
        <div className={style.InfoOglas}>
          <div className={style.DisplayMenyInfo}>
            {order && (
              <>
                <Icon icon={"location_on"} />
                <label>{"Trg 14. oktobra 6"}</label>
              </>
            )}
            {meni && (
              <>
                <Icon icon={"edit"} />
                <label>{meni.naziv}</label>{" "}
              </>
            )}
          </div>
          <div className={style.DisplayMenyInfo}>
            {order && (
              <>
                <Icon icon={"calendar_month"} />
                <label>{"14.5.2024."}</label>{" "}
              </>
            )}
            {meni && (
              <>
                <Icon icon={"edit"} />
                <label>{meni.opis}</label>{" "}
              </>
            )}
          </div>
        </div>
        <div className={style.InfoOglas}>
          <div className={style.DisplayMenyInfo}>
            {order && (
              <>
                {" "}
                <Icon icon={"house"} />
                <label>{"Vila ramonda"}</label>{" "}
              </>
            )}
            {meni && (
              <>
                {" "}
                <Icon icon={"payments"} />
                <label>{meni.cenaMenija}</label>{" "}
              </>
            )}
          </div>
          <div className={style.DisplayMenyInfo}>
            {order && (
              <>
                {" "}
                <Icon icon={"payments"} />
                <label>{"200"}</label>{" "}
              </>
            )}
          </div>
        </div>
      </div>
      <div className={style.acceptDecline}>
        <div className={style.ButtonParentDiv}>
          <MojButton
            icon="check"
            text="Prihvati"
            backgroundColor="#00D615"
            wide={true}
          />
        </div>
        <div className={style.ButtonParentDiv}>
          <MojButton
            icon="cancel"
            text="Odbij"
            backgroundColor="#FA3636"
            wide={true}
          />
        </div>
      </div>
    </div>
  );
};
export default MenyCard;
