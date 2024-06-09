import { ReservedOglas } from "@/store/api/endpoints/korisnik/types";
import style from "./style.module.css";
import MojButton from "@/components/lib/button";
import { useGetAgencyDataQuery } from "@/store/api/endpoints/agencija";

type Props = {
  reservedOglas: ReservedOglas;
};

const ReservedOglasCard = ({ reservedOglas }: Props) => {

// const {data: reservedCatering} = useGetReserved

  return (
    <>
      <div className={style.Wrapper}>
        <div className={`${style.Container} bs`}>
          <div className={style.contentWrapper}>
            <div className={style.agencyOglasContainer}>

            </div>
            <div className={style.bottomText}>
                {/* od do */}
            </div>
          </div>
        </div>
        <div className={style.Actions}>
          <MojButton
            icon="star"
            color="white"
            text="Oceni oglas"
            onClick={() => {}}
            small={true}
            backgroundColor="var(--golden)"
          />
          <MojButton
            icon="star"
            color="white"
            text="Oceni agenciju"
            onClick={() => {}}
            small={true}
            backgroundColor="var(--golden)"
          />
          <MojButton
            icon="add"
            color="white"
            text="Dodaj ketering"
            onClick={() => {}}
            small={true}
            backgroundColor="var(--green)"
          />
          <MojButton
            icon="cancel"
            color="white"
            text="Otkaži ketering"
            onClick={() => {}}
            small={true}
            backgroundColor="var(--delete)"
          />
          <MojButton
            icon="delete"
            color="white"
            text="Otkaži rezervaciju"
            onClick={() => {}}
            small={true}
            backgroundColor="var(--delete)"
          />
        </div>
      </div>
    </>
  );
};

export default ReservedOglasCard;
