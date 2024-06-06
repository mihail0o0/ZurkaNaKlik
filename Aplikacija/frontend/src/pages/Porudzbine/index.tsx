import { useGetCateringOrdersQuery } from "@/store/api/endpoints/agencija";
import style from "./style.module.css";

const Porudzbine = () =>{
    const {data: narudzbine}=useGetCateringOrdersQuery();
     
    const odobreneNarudzbine = narudzbine ? narudzbine.filter((narudzbina) => narudzbina.statusRezervacije === true) : [];
    const odbijeneNarudzbine = narudzbine ? narudzbine.filter((narudzbina) => narudzbina.statusRezervacije === false) : [];
    const narudzbineNaCekanju = narudzbine ? narudzbine.filter((narudzbina) => narudzbina.statusRezervacije === null) : [];

    
    return(
          <div className={`containerWrapper ${style.Container}`}>

          </div>
    )
}
export default Porudzbine;