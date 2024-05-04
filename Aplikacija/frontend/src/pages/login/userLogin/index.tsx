import style from "../style.module.css";

import LoginLabel from "@/components/labels/login";
// import UserLoginForm from "./login/UserLoginForm";

function UserLoginPage() {
    return (
        <div className={`containerWrapper ${style.container}`}>
            <div className={style.textContent}>
                <div className={style.textWrapper}>
                    <h1>Prijavite se</h1>
                    <p>Prijavite  se na svoj nalog putem emaila i sifre.
                        Ukoliko nemate nalog mozete ga otvoriti u par klika.</p>
                    <div className="smallSpace" />
                </div>
                <div className={style.optionsWrapper}>
                    <LoginLabel text={"Nudite usluge keteringa?"} linkText={"Oglasite se"} link={"/catering/register"} />
                    <LoginLabel text={"Nemate nalog?"} linkText={"Registrujte se"} link={"/user/register"} />
                </div>
            </div>
            <div className={style.loginElements}>
                <UserLoginForm />
            </div>
        </div>
    );
}

export default UserLoginPage;