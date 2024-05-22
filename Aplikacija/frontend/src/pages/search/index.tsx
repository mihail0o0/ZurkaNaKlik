import MojButton from "@/components/lib/button"
import style from "./style.module.css"

const Search=()=> {
    return(
        <div className={style.SearchDiv}>
            <div className={style.GoreDiv}>
                <div className={style.TekstDivVeliki}>
                <h1 >Pronađite svoj savršeni prostor!</h1>
                </div>
                <div className={style.TekstDivMali}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis  ornare tortor sed dignissim. Nunc ac ipsum placerat, cursus arcu in,  facilisis purus. </p>
                </div>
              </div>
            <div className={style.DoleDiv}>
                <div className={style.Dugmad}>
               {
                nizDugmad.map((dugme, index) => {
                        return <MojButton  text={dugme} onClick={()=>{}} paddingX="12px" paddingY="15px"fontSize="15px" backgroundColor="white" color="black" />
                })
               }
             </div>
             <div className={style.DivZaPretragu}>
                {/* ovde idu filteri */}
                {/* prvo div za ikonice i unos teksta */}
                <div className={style.DugmeFilter}>
                  {  imenaIkonica.map((ikonica,index) => {
                       
                        return <MojButton text={txt[index]} onClick={()=>{}} paddingX="13px" paddingY="8px"fontSize="15px" icon={ikonica} backgroundColor="#d3d3d3" color="black" wide="15%"/>

                    })}
                    <MojButton text="Pretrazi " onClick={()=>{}} paddingX="25px" paddingY="15px"fontSize="15px"wide="20%"  />
                </div>
                {/*jos filterea*/ }
                <div className={style.JosFiltera}>
                   <img src="../public/images/page_info.png"/>
                   <p>Još filtera</p>
                </div>

             </div>
            </div>
       
        </div>
    )

}
const nizDugmad=["Sve","Rođendan","Žurka","Team building","Momačko veče","Devojačko vece","Ostalo"]
const imenaIkonica=["search","calendar_month","euro_symbol","boy"]
const txt=["Grad","Datum od-do","Cena","Broj ljudi"]
export default Search;