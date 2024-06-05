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
import MenyCard from "@/components/MenyCard";

const AgencyView = () => {
  const currUser = useSelector(selectUser);
  const { id } = useParams();
  const idAgencije = id ? parseInt(id) : undefined;
  console.log(idAgencije);
  const { data: agencyData } = useGetAgencyDataQuery(idAgencije ?? skipToken );
  console.log(agencyData);
  const{data : meniDTO}=useGetAgencyMenuesQuery(idAgencije ?? skipToken );
  
  const menijiMatrica=meniDTO?.map((meniDTO)=> meniDTO.meniKeteringa); 
  // znaci ovde imam niz menija sa menijima ???????? ovo je matrica
  console.log(meniDTO);
  type MenuListProps={
    getMenuDTO:GetMenuDTO[],
  }
  const MenuList = ({ getMenuDTO}:MenuListProps) => (
    <div className="menu-list">
    {getMenuDTO.map((catering) =>
      Array.isArray(catering.meniKeteringa) ? (
        catering.meniKeteringa.map((menu) => (
          <MenyCard meni={menu} />
        ))
      ) : (
        <div >No menus available</div>
      )
    )}
  </div>
  );




  return (
    <>
      <PageSpacer variant="xs" />
      <div className={`containerWrapper ${style.Glavni}`}>
        <div className={style.Gore}>
          {/* DIV TXT */}
          <div className={style.Heading}>
            <div className={style.HeadingText}>
              <h1> Osnovne informacije o agenciji {agencyData?.ime}</h1>
             
            </div>
            <div className={style.AvatarText}>
              <UserAvatar size={100} letter={agencyData?.ime} />
              <Typography fontSize={24}>{agencyData?.ime}</Typography>
            </div>
          </div>
          {/* div za opis agencije i grad,brtel, cenu i mogucnost dostave */}
          <div className={style.DodatneInfo}>
            {/* txt box */}
            <div>
              {/* <input type="text" className={style.TxtBox} /> */}
             
              <p>{agencyData && agencyData.opis} opisopis</p>
            </div>
            {/* inputi za grad br cenu i check */}
            <div className={style.Inputs}>
             
              <DisplayCard text={agencyData ? agencyData.ime : ""} icon="edit"/>
              <DisplayCard text={agencyData ? agencyData.lokacija : ""} icon="location_on"/>
              <DisplayCard text={agencyData ? agencyData.brTel : ""} icon="call"/>
              <DisplayCard text={agencyData ? agencyData.email : ""} icon="mail"/>
           
            </div>
          </div>
        </div>
        <div className={style.Dole}>
         
          <div className={style.DodajMenije}>
            <h2>Meniji</h2>
            { meniDTO && <MenuList getMenuDTO={meniDTO}/>}
          </div>
        </div>
        
      </div>
    </>
  );
};

export default AgencyView;
