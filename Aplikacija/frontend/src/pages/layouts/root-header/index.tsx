import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import style from "./style.module.css";
import { useSelector } from "react-redux";
import { selectIsFirstLogin, selectUser } from "@/store/auth";
import Navbar from "./navbar";
import MojButton from "@/components/lib/button";
import { useEffect, useMemo } from "react";
import { Role } from "@/models/role";

const RootHeader = () => {
  const user = useSelector(selectUser);
  const isFirstLogin = useSelector(selectIsFirstLogin);
  const navigate = useNavigate();
  const location = useLocation();

  

  console.log(user);
  const textMessage = useMemo(() => {
    if (!user) return;

    if (user.role == Role.AGENCIJA) {
      console.log("da");
      return "Podesite sve što se tiče vaše agencije";
    }
  }, [user]);

  const showMessage = user && isFirstLogin && location.pathname !== '/catering/profile';
  console.log(location.pathname);

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
            {/* <p>Ic my first time</p> */}
            <div className="headerMessage">
              <p>{textMessage}</p>
            </div>
            <div className={style.profileButton}>
              <MojButton
                classes={style.profileButton}
                small={true}
                grey={true}
                text="Profil"
                onClick={() => {
                  navigate('/catering/profile');
                }}
              />
            </div>
          </div>
        )}
      </div>
      <main>
        <Outlet />
      </main>
      <footer className={style.AppFooter}>
        <div className={style.ZurNKlk}>
          <div className={style.LogoSLikaDiv}>
            <img src="./public/images/logo.png"/>
          </div>
          <div className={style.Opis}>
            <p>Zurka na klik je platforma za oglasavanje kuca, vikendica, stanova, poslovnih prostora povodom zurka, proslava, sastanaka.</p>
          </div>

        </div>
        <div className={style.RaditeSaNama}>
          <h3>Radite sa nama</h3>
          <div className={style.Korisnik}>
            <h5>Registrujte se kao korisnik</h5>
          <div className={style.Red}>
            <p>Prijavite se kao korisnik</p>
          </div>
          <div className={style.Red}>
            <p>Oglasite Vas prostor</p>
          </div>
          </div>
          <div className={style.Korisnik}>
            <h5>Registrujte se kao Agencija za ketering</h5>
          <div className={style.Red}>
            <p>Prijavite se kao Agencija za ketering</p>
          </div>
          <div className={style.Red}>
            <p>Postavite Vase menije</p>
          </div>
          </div>
         
        </div>
        <div className={style.RaditeSaNama}>
          <h3>Kontaktirajte nas</h3>
          <div className={style.Korisnik}>
            <h5>Posaljite nam poruku</h5>
          <div className={style.Red}>
            <p>Email: zurkanaklik@gmail.com</p>
          </div>
          <div className={style.Red}>
            <p>Instagram: @ZurkaNaKlik</p>
          </div>
          </div>
          
          </div>
         
         
       
        
      </footer>
    </>
  );
};

export default RootHeader;
