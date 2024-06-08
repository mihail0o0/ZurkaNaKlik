import Input from "@/components/lib/inputs/text-input";
import style from "./style.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import MojButton from "@/components/lib/button";

import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetAgencyDataQuery,
  useGetAllCategoriesQuery,
  useGetMenuesQuery,
  useUpdateAgencyDataMutation,
} from "@/store/api/endpoints/agencija";
import { Chip, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/auth";
import { updateAgencySchema } from "@/utils/validators";
import { getMessage } from "@reduxjs/toolkit/dist/actionCreatorInvariantMiddleware";
import { getValidationMessage } from "@/utils/validationMessage";
import { toast } from "react-toastify";
import { skipToken } from "@reduxjs/toolkit/query";
import UserAvatar from "@/components/UserAvatar";
import PageSpacer from "@/components/lib/page-spacer";
import { useParams } from "react-router-dom";
import DisplayCard from "@/components/DisplayCard";
import { useGetAgencyMenuesQuery } from "@/store/api/endpoints/pregled";
import MenyCardPorudzbine from "@/components/MenyCardPorudzbine";
import MenyCardView from "@/components/MenyCardView";
import CategoryMenuCard from "./CategoryMenuCard";
import UploadComponent from "@/components/UploadComponent";
import {
  useGetImageQuery,
  useUploadAgencyMutation,
} from "@/store/api/endpoints/images";
import { ResultType } from "@/types";
import { getRawLocation } from "@/utils/handleQueries";

const AgencyView = () => {
  const currUser = useSelector(selectUser);
  const { id } = useParams();
  const idAgencije = id ? parseInt(id) : undefined;
  const { data: agencyData } = useGetAgencyDataQuery(idAgencije ?? skipToken);
  const { data: meniDTO } = useGetAgencyMenuesQuery(idAgencije ?? skipToken);

  const { data: profileImage } = useGetImageQuery(
    getRawLocation(agencyData?.slikaProfila) ?? skipToken
  );

  const [uploadAction] = useUploadAgencyMutation();

  const uploadAgency = async (formData: FormData): Promise<ResultType> => {
    const result = await uploadAction(formData);
    return result;
  };

  if (!agencyData) {
    return null;
  }

  return (
    <>
      <PageSpacer variant="xs" />
      <div className={`containerWrapper ${style.Glavni}`}>
        <div className={style.Gore}>
          {/* DIV TXT */}
          <div className={style.Heading}>
            <div className={style.HeadingText}>
              <h2>Osnovne informacije o agenciji {agencyData?.ime}</h2>
            </div>
            <div className={style.AvatarText}>
              <UploadComponent uploadFn={uploadAgency}>
                <UserAvatar
                  uploadable={true}
                  src={profileImage}
                  size={100}
                  letter={agencyData.ime[0]}
                />
                <Typography fontSize={24}>{agencyData.ime}</Typography>
              </UploadComponent>
            </div>
          </div>
          {/* div za opis agencije i grad,brtel, cenu i mogucnost dostave */}
          <div className={style.DodatneInfo}>
            {/* txt box */}
            <div>
              {/* <input type="text" className={style.TxtBox} /> */}

              <Typography maxWidth={"400px"}>{agencyData.opis}</Typography>
            </div>
            {/* inputi za grad br cenu i check */}
            <div className={style.Inputs}>
              <DisplayCard text={agencyData.ime} icon="edit" />
              <DisplayCard text={agencyData.lokacija} icon="location_on" />
              <DisplayCard text={agencyData.brTel} icon="call" />
              <DisplayCard text={agencyData.email} icon="mail" />
            </div>
          </div>
        </div>
        <div className={style.Dole}>
          <div className={style.DodajMenije}>
            <h2>Meniji</h2>
            {!meniDTO && (
              <div>
                <p>Nema dostupnih menija</p>
              </div>
            )}
            {meniDTO &&
              meniDTO.map((category) => {
                return <CategoryMenuCard category={category} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AgencyView;
