import { useNavigate } from "react-router-dom";

// components
import { MainButton, PageSpacer } from "../common/commonComponents";

// other
import { ReactComponent as PNF } from "../assets/images/pageNotFound.svg";

function PageNotFound() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    }

    return (
        <>
            <div className="containerWrapper pageNotFoundWrapper">
                <div className="pageNotFoundText">
                    <div className="pageNotFoundTextContainer">
                        <h1>Uuuups!</h1>
                        <p>Stranica koju ste zatražili nažalost ne postoji.</p>
                    </div>
                    <MainButton text={"Nazad na početnu"} onClick={handleClick}/>
                </div>
                <PNF className="pageNotFoundImage"></PNF>
            </div>
            <PageSpacer />
        </>
    );
}

export default PageNotFound;