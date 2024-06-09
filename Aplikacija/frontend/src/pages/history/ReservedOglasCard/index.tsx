import { ReservedOglas } from "@/store/api/endpoints/korisnik/types";
import style from "./style.module.css";
import MojButton from "@/components/lib/button";
import { useGetAgencyDataQuery } from "@/store/api/endpoints/agencija";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetImageQuery } from "@/store/api/endpoints/images";
import { getRawLocation } from "@/utils/handleQueries";
import { useGetOglasQuery } from "@/store/api/endpoints/oglas";
import { format } from "date-fns";
import UserAvatar from "@/components/UserAvatar";
import { useMemo } from "react";

type Props = {
  reservedOglas: ReservedOglas;
};

const ReservedOglasCard = ({ reservedOglas }: Props) => {
  const defaultImage = "/image/imageNotFound.jpg";
  const { data: agency } = useGetAgencyDataQuery(
    reservedOglas.idAgencije || skipToken
  );
  const { data: oglas } = useGetOglasQuery(reservedOglas.oglasId ?? skipToken);

  const { data: agencyImage } = useGetImageQuery(
    getRawLocation(agency?.slikaProfila) ?? skipToken
  );

  const { data: oglasImage } = useGetImageQuery(
    getRawLocation(oglas?.slike[0]) ?? skipToken
  );

  const oglasDisplayImage = oglasImage ?? defaultImage;

  const statusKeteringa: string = useMemo(() => {
    if (reservedOglas.statusZahtevaZaKetering == undefined) return "Na čekanju";
    if (reservedOglas.statusZahtevaZaKetering) return "Potvrđeno";
    return "Odbijeno";
  }, [reservedOglas]);

  if (!oglas) {
    return;
  }

  return (
    <>
      <div className={style.Wrapper}>
        <div className={`${style.Container} bs`}>
          <div className={style.contentWrapper}>
            <div className={style.agencyOglasContainer}>
              <div className={style.oglas}>
                <img src={oglasDisplayImage} />
                <h3>{oglas.naziv}</h3>
              </div>
              <div className={style.agency}>
                <UserAvatar size={100} src={agencyImage} letter={agency?.ime} />
                <h3>{oglas.naziv}</h3>
              </div>
            </div>
            <div className={style.bottomText}>
              <p>
                {format(reservedOglas.zakupljenOd, "LLL d, yyy")} {" - "}
                {format(reservedOglas.zakupljenDo, "LLL d, yyy")}
              </p>
            </div>
          </div>
          <div className={style.total}>
            <p>Status Keteringa:</p>
            <p>{statusKeteringa}</p>
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
