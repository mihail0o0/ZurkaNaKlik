import { ReactComponent as PNF } from "../assets/images/pageNotFound.svg";
import { MainButton } from "../common/commonComponents";

function PageNotFound() {
    return (
        <>
            <div className="containerWrapper pageNotFoundWrapper">
                <div className="pageNotFoundText">
                    <div className="pageNotFoundTextContainer">
                        <h1>Uuuups!</h1>
                        <p>Stranica koju ste zatražili nažalost ne postoji.</p>
                    </div>
                    <MainButton text={"Nazad na početnu"} />
                </div>
                <PNF className="pageNotFoundImage"></PNF>
            </div>
        </>
    );
}

export default PageNotFound;