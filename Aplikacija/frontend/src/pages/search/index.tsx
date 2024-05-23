import MojButton from "@/components/lib/button";
import style from "./style.module.css";
import DivFilteri from "./DivFilteri";

const Search = () => {
  return (
    <div className={style.SearchDiv}>
      <div className={style.GoreDiv}>
        <div className={style.TekstDivVeliki}>
          <h1>Pronađite svoj savršeni prostor!</h1>
        </div>
        <div className={style.TekstDivMali}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis
            ornare tortor sed dignissim. Nunc ac ipsum placerat, cursus arcu in,
            facilisis purus.{" "}
          </p>
        </div>
      </div>
      <div className={style.DoleDiv}>
        <div className={style.Dugmad}>
          {nizDugmad.map((dugme, index) => {
            return (
              <MojButton
                text={dugme}
                onClick={() => {}}
                paddingX="12px"
                paddingY="15px"
                fontSize="15px"
                backgroundColor="white"
                color="black"
              />
            );
          })}
          
        </div>
        <DivFilteri />
      </div>
    </div>
  );
};
const nizDugmad = [
  "Sve",
  "Rođendan",
  "Žurka",
  "Team building",
  "Momačko veče",
  "Devojačko vece",
  "Ostalo",
];

export default Search;
