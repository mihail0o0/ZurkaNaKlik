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
  const defaultImage = "/images/imageNotFound.jpg";
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
  
  console.log("STATUS");
  console.log(reservedOglas.statusZahtevaZaKetering);

  const statusKeteringa: string = useMemo(() => {
    if (reservedOglas.statusZahtevaZaKetering == undefined) return "Na čekanju";
    if (reservedOglas.statusZahtevaZaKetering) return "Potvrđeno";
    return "Odbijeno";
  }, [reservedOglas]);

  const totalPrice = useMemo(() => {
    let price = 0;
    if (reservedOglas.cenaKeteringa) price += reservedOglas.cenaKeteringa;
    if (reservedOglas.cenaOglasa) price += reservedOglas.cenaOglasa;
    return price;
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
                <div className={style.avatarContainer}>
                  <UserAvatar
                    size={100}
                    src={agencyImage}
                    letter={agency?.ime}
                  />
                </div>
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
          <div className={style.right}>
            <div className={style.status}>
              <p>Status Keteringa:</p>
              <p>{statusKeteringa}</p>
            </div>
            <div className={style.total}>
              <p>Prostor: {reservedOglas.cenaOglasa} din</p>
              <p>Ketering: {reservedOglas.cenaKeteringa} din</p>
              <p>Ukupno: {totalPrice} din</p>
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
