import { NavLink, Outlet } from "react-router-dom";
import headerStyle from '../cssModules/header.module.css'



function RootHeader() {
    return ( 
        <>
            <header className={headerStyle.AppHeader}>
                <nav>
                    <NavLink to="/" className={headerStyle.ZurkaNaKlik}>ZurkaNaKlik</NavLink>
                    <NavLink to="/Login" className={headerStyle.LoginButtonHeader}>Prijava</NavLink>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </>
     );
}


export default RootHeader;