import MojButton from "@/components/lib/button";
import Input from "@/components/lib/inputs/text-input";
import style from "./style.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import {
  useAddMenuMutation,
  useDeleteMenuMutation,
} from "@/store/api/endpoints/agencija";
import { enumToString } from "@/utils/enumMappings";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/auth";
import DisplayCard from "@/components/DisplayCard";
import { DESTRUCTION } from "dns";
import { toast } from "react-toastify";

type Props = {
  kategorija?: Category[];
  menuData?: Menu;
};

const Meniji = ({ kategorija, menuData }: Props) => {
  const currUser = useSelector(selectUser);

  const [deleteMenu] = useDeleteMenuMutation();
  let selectedKategorija = "";
  if (kategorija && menuData) {
    for (let i = 0; i < kategorija?.length; i++) {
      if (kategorija[i].id === menuData.idKategorije) {
        selectedKategorija = kategorija[i].naziv;
      }
    }
  }

  const deleteMeny = async () => {
    if (!menuData) return;
    const result = await deleteMenu(menuData.id);

    if ("error" in result) {
      return;
      console.log("nece");
    }

    toast.success("Meni je uspesno obrisan!");
  };

  return (
    <div className={style.menijji}>
      <div className={style.InputiOpisPlusic}>
        {/* odje ide ime menija blabla */}
        <div className={style.Kocka}>
          <div className={style.Red}>
            <div className={style.Inputsredi}>
              {menuData && (
                <DisplayCard text={menuData.naziv} icon={"restaurant_menu"} />
              )}
            </div>

            <div className={style.Inputsredi}>
              <DisplayCard text={"Odaberi sliku"} icon={"image"} />
            </div>
          </div>
          <div className={style.Red}>
            <div className={style.Inputsredi}>
              {menuData && (
                <DisplayCard
                  text={menuData.cenaMenija.toString()}
                  icon={"payments"}
                />
              )}
            </div>
            <div className={style.Inputsredi}>
              <DisplayCard text={selectedKategorija} icon={"category"} />
            </div>
          </div>
        </div>
        {/* opis menija */}
        <div className={style.Kocka}>
          {menuData && (
            <textarea
              placeholder="Opis menija"
              className={style.TxtAreaPostojeciMeni}
              value={menuData?.opis}
              onChange={() => {}}
              disabled
            />
          )}
        </div>
        <div className={style.Kocka}>
          <MojButton
            onClick={deleteMeny}
            icon="delete"
            paddingX="20px"
            paddingY="20px"
          />
        </div>
      </div>
    </div>
  );
};
export default Meniji;
