import { NavLink, Outlet } from "react-router-dom";

function RootHeader() {
    return ( 
        <>
            <header className="AppHeader">
                <nav>
                    <NavLink to="/" className="ZurkaNaKlik">ZurkaNaKlik</NavLink>
                    <NavLink to="/Login" className="LoginButtonHeader">Prijava</NavLink>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </>
     );
}


export default RootHeader;