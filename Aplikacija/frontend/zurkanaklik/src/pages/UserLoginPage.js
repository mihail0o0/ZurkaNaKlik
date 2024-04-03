import loginStyle from "./login/login.module.css";

import LoginLabel from "./login/LoginLabel";
import UserLoginForm from "./login/UserLoginForm";

function UserLoginPage() {
    return (
        <div className={`containerWrapper ${loginStyle.container}`}>
            <div className={loginStyle.textContent}>
                <div className={loginStyle.textWrapper}>
                    <h1>Prijavite se</h1>
                    <p>Prijavite  se na svoj nalog putem emaila i sifre.
                        Ukoliko nemate nalog mozete ga otvoriti u par klika.</p>
                    <div className="smallSpace" />
                </div>
                <div className={loginStyle.optionsWrapper}>
                    <LoginLabel text={"Nudite usluge keteringa?"} linkText={"Oglasite se"} link={"/catering/register"} />
                    <LoginLabel text={"Nemate nalog?"} linkText={"Otvorite ga"} link={"/user/register"} />
                </div>
            </div>
            <div className={loginStyle.loginElements}>
                <UserLoginForm />
            </div>
        </div>
    );
}

export default UserLoginPage;