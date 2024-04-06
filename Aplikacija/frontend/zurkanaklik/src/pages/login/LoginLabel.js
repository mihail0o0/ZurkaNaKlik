import { NavLink } from "react-router-dom";

function LoginLabel({ text, linkText, link }) {
    return (
        <p className="blackColor">{text} <span><NavLink className="textLink" to={link}>{linkText}</NavLink></span></p>
    );
}

export default LoginLabel;