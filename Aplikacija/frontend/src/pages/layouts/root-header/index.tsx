import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import style from "./style.module.css";
import { useSelector } from "react-redux";
import { selectIsFirstLogin, selectUser } from "@/store/auth";
import Navbar from "./navbar";
import MojButton from "@/components/lib/button";
import { useEffect, useMemo } from "react";
import { Role } from "@/models/role";

type ZaPrikaz = {
  message: string;
  link: string;
};

const RootHeader = () => {
  const user = useSelector(selectUser);
  const isFirstLogin = useSelector(selectIsFirstLogin);
  const navigate = useNavigate();
  const location = useLocation();

  const zaPrikaz: ZaPrikaz | undefined = useMemo(() => {
    if (!user) return;

    let objPrikaz: ZaPrikaz;
    if (user.role == Role.AGENCIJA) {
      objPrikaz = {
        message: "Podesite sve što se tiče vaše agencije",
        link: "/catering/profile",
      };
    } else {
      objPrikaz = {
        message: "Postavke profila",
        link: "/user/profile",
      };
    }

    return objPrikaz;
  }, [user]);

  const showMessage =
    zaPrikaz && isFirstLogin && location.pathname !== "/catering/profile";

  return (
    <>
      <div className={style.AppHeaderWrapper}>
        <header className={style.AppHeader}>
          <nav>
            <NavLink to="/" className={style.ZurkaNaKlik}>
              ZurkaNaKlik
            </NavLink>

            {user && <Navbar user={user} />}

            {!user && (
              <NavLink to="/Login" className={style.LoginButtonHeader}>
                Prijava
              </NavLink>
            )}
          </nav>
        </header>
        {showMessage && (
          <div className={style.headerPoopup}>
            <div className="headerMessage">
              <p>{zaPrikaz.message}</p>
            </div>
            <div className={style.profileButton}>
              <MojButton
                classes={style.profileButton}
                small={true}
                grey={true}
                text="Profil"
                onClick={() => {
                  navigate(zaPrikaz.link);
                }}
              />
            </div>
          </div>
        )}
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootHeader;
