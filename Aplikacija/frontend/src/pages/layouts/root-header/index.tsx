import { NavLink, Outlet } from "react-router-dom";
import style from "./style.module.css";
import { useSelector } from "react-redux";
import { selectAuthToken, selectUser } from "@/store/auth";
import LabeledAvatar from "@/components/LabeledAvatar";

const RootHeader = () => {
  const user = useSelector(selectUser);

  return (
    <>
      <header className={style.AppHeader}>
        <nav>
          <NavLink to="/" className={style.ZurkaNaKlik}>
            ZurkaNaKlik
          </NavLink>

          {user && 
            <LabeledAvatar heading text={user.name}/>
          }
          {!user && (
            <NavLink to="/Login" className={style.LoginButtonHeader}>
              Prijava
            </NavLink>
          )}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootHeader;
