import Input from "@/components/lib/inputs/text-input";
import style from "./style.module.css";
import { useEffect, useState } from "react";
import MojButton from "@/components/lib/button";
import { useSelector } from "react-redux";
import { logOut, selectUser } from "@/store/auth";
import OglasKartica from "@/components/OglasKartica";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  useDeleteUserMutation,
  useGetUserDataQuery,
  useUpdateUserMutation,
} from "@/store/api/endpoints/korisnik";
import UserAvatar from "@/components/UserAvatar";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetKorisnikOglasiQuery,
  useGetUserOglasiQuery,
} from "@/store/api/endpoints/oglas";
import { skipToken } from "@reduxjs/toolkit/query";
import DisplayCard from "@/components/DisplayCard";
import { UpdateUserDTO } from "@/store/api/endpoints/korisnik/types";
import { updateUserSchema } from "@/utils/validators";
import { getValidationMessage } from "@/utils/validationMessage";
import { toast } from "react-toastify";
import Icon from "@/components/lib/icon";
import {
  useGetImageQuery,
  useUploadKorisnikMutation,
} from "@/store/api/endpoints/images";
import { getRawLocation } from "@/utils/handleQueries";
import UploadComponent from "@/components/UploadComponent";
import { ResultType } from "@/types";
import { useAppDispatch } from "@/store";

const UserViewProfile = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const idKorisnika = id ? parseInt(id) : undefined;
  const { data: vlasnikOglasa } = useGetUserDataQuery(idKorisnika ?? skipToken);

  const { data: tudjiOglasi } = useGetKorisnikOglasiQuery(
    idKorisnika ?? skipToken
  );

  const dispatch = useAppDispatch();

  const { data: imageUrl } = useGetImageQuery(
    getRawLocation(vlasnikOglasa?.profilePhoto) ?? skipToken
  );

  const [uploadKorisnikAction] = useUploadKorisnikMutation();

  const uploadKorisnik = async (formData: FormData): Promise<ResultType> => {
    const result = await uploadKorisnikAction(formData);
    return result;
  };

  return (
    <div className={`containerWrapper ${style.Container}`}>
      <div className={style.PostavkeProfila}>
        <div className={style.Postavke2}>
          {/* odje ide slika od kad je clan broj oglasa i prosecna ocena */}
          <div className={style.KarticaSaSlikom}>
            <div className={style.SlikaImeIPrezime}>
              <UploadComponent uploadFn={uploadKorisnik}>
                <UserAvatar
                  uploadable={true}
                  size={100}
                  letter={vlasnikOglasa && vlasnikOglasa.name[0]}
                  src={imageUrl}
                />
              </UploadComponent>
              <p>
                {vlasnikOglasa && vlasnikOglasa.name}{" "}
                {vlasnikOglasa && vlasnikOglasa.lastName}
              </p>
            </div>
          </div>
          <div className={style.OsnovnePostavkeProfila}>
            <div className={style.PostavkeProfilaTXT}>
              <h2>Osnovne informacije profila</h2>
            </div>
            <div className={style.Inputi}>
              <div className={style.Red}>
                <DisplayCard
                  icon={"boy"}
                  text={
                    (vlasnikOglasa &&
                      vlasnikOglasa.name + " " + vlasnikOglasa?.lastName) ||
                    ""
                  }
                />

                <DisplayCard
                  icon={"boy"}
                  text={(vlasnikOglasa && vlasnikOglasa.lastName) || ""}
                />
              </div>
              <div className={style.Red}>
                <DisplayCard
                  icon={"mail"}
                  text={(vlasnikOglasa && vlasnikOglasa.email) || ""}
                />

                <DisplayCard
                  icon={"call"}
                  text={(vlasnikOglasa && vlasnikOglasa.phoneNumber) || ""}
                />
              </div>
              <div className={style.Red}>
                <DisplayCard
                  icon={"location_on"}
                  text={(vlasnikOglasa && vlasnikOglasa.location) || ""}
                />
              </div>
            </div>
            <div className={style.Dugmenajjace}>
              <div className={style.Dugme2}>{/* da azuriram korisnika */}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.MojiOglasi}>
        <div>
          <h2>Oglasi korisnika {vlasnikOglasa?.name}</h2>
        </div>
        <div className={style.OglasiKartice}>
          {tudjiOglasi?.map((oglas) => (
            <div key={oglas.id}>
              <OglasKartica oglas={oglas} onClick={() => {}} />
            </div>
          ))}
        </div>
        <div className={style.Dugmenajjace}>
          <div className={style.Dugme2}></div>
        </div>
      </div>
    </div>
  );
};

export default UserViewProfile;
