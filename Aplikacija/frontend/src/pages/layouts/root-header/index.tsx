import { NavLink, Outlet } from "react-router-dom";
import style from "./style.module.css";

function RootHeader() {
  return (
    <>
      <header className={style.AppHeader}>
        <nav>
          <NavLink to="/" className={style.ZurkaNaKlik}>
            ZurkaNaKlik
          </NavLink>
          <NavLink to="/Login" className={style.LoginButtonHeader}>
            Prijava
          </NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootHeader;
