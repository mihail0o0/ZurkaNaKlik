import { useGetCateringOrdersQuery } from "@/store/api/endpoints/agencija";
import style from "./style.module.css";
import { useGetAgencyListMenuesQuery } from "@/store/api/endpoints/pregled";

const Porudzbine = () =>{
    const {data: narudzbine}=useGetCateringOrdersQuery();
     
    const odobreneNarudzbine = narudzbine ? narudzbine.filter((narudzbina) => narudzbina.statusRezervacije === true) : [];
    const odbijeneNarudzbine = narudzbine ? narudzbine.filter((narudzbina) => narudzbina.statusRezervacije === false) : [];
    const narudzbineNaCekanju = narudzbine ? narudzbine.filter((narudzbina) => narudzbina.statusRezervacije === null) : [];
  
    const menijiOdobreniID = odobreneNarudzbine.flatMap(order => order.idMenija || []);
    const menijiNaCekanjuID=narudzbineNaCekanju.flatMap(order=> order.idMenija || []);
    const menijiOdbijeniID=odbijeneNarudzbine.flatMap(order=> order.idMenija || []);

    const{data: menuOdobreni}=useGetAgencyListMenuesQuery(menijiOdobreniID);
    const{data: menuNaCekanju}=useGetAgencyListMenuesQuery(menijiNaCekanjuID);
    const{data: menuOdbijeni}=useGetAgencyListMenuesQuery(menijiOdbijeniID);
    
    return(
          <div className={`containerWrapper ${style.Container}`}>

          </div>
    )
}
export default Porudzbine;