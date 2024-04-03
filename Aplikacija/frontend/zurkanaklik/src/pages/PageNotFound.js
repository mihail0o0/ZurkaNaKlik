import { useNavigate } from "react-router-dom";
import pnfStyle from './pageNotFound/pageNotFound.module.css';

// components
import { MainButton, PageSpacer } from "../common/commonComponents";

// other
import { ReactComponent as PNF } from "../assets/images/pageNotFound.svg";

function PageNotFound() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };

    return (
        <>
            <div className={`containerWrapper ${pnfStyle.wrapper}`}>
                <div className={pnfStyle.text}>
                    <div className="pageNotFoundTextContainer">
                        <h1>Uuuups!</h1>
                        <p>Stranica koju ste zatražili nažalost ne postoji.</p>
                    </div>
                    <MainButton text={'Nazad na pocetnu'} onClick={handleClick}/>
                </div>
                <PNF className={pnfStyle.image}></PNF>
            </div>
            <PageSpacer />
        </>
    );
}

export default PageNotFound;