import { useGetCateringOrdersQuery } from "@/store/api/endpoints/agencija";
import style from "./style.module.css";
import { useGetAgencyListMenuesQuery } from "@/store/api/endpoints/pregled";
import MenyCardPorudzbine from "@/components/MenyCardPorudzbine";

const Porudzbine = () => {
  const { data: narudzbine } = useGetCateringOrdersQuery();
  console.log(narudzbine + "naruzbine");

  const odobreneNarudzbine = narudzbine
    ? narudzbine.filter((narudzbina) => narudzbina.statusRezervacije === true)
    : [];
  const odbijeneNarudzbine = narudzbine
    ? narudzbine.filter((narudzbina) => narudzbina.statusRezervacije === false)
    : [];
  const narudzbineNaCekanju = narudzbine
    ? narudzbine.filter((narudzbina) => narudzbina.statusRezervacije === null)
    : [];

  console.log(narudzbineNaCekanju + "odobrene naruzbine");
  const menijiOdobreniID = odobreneNarudzbine.flatMap(
    (order) => order.idMenija || []
  );
  const menijiNaCekanjuID = narudzbineNaCekanju.flatMap(
    (order) => order.idMenija || []
  );
  const menijiOdbijeniID = odbijeneNarudzbine.flatMap(
    (order) => order.idMenija || []
  );
  
  // const { data: menuOdobreni } = useGetAgencyListMenuesQuery(menijiOdobreniID);
  // const { data: menuNaCekanju } = useGetAgencyListMenuesQuery(menijiNaCekanjuID);
  // const { data: menuOdbijeni } = useGetAgencyListMenuesQuery(menijiOdbijeniID);

  return (
    <div className={`containerWrapper ${style.Container}`}>
      <div className={style.OdobrenePorudzbine}>
        <h3>Nove porudzbine</h3>
        <div className={style.listPorudzbine}>
          {narudzbineNaCekanju.map((narudzbina,index) => {
            return <MenyCardPorudzbine order={narudzbina}  />;
          })}
        </div>
      </div>
      <div className={style.OdobrenePorudzbine}>
        <h3>Odobrene porudzbine</h3>
        <div className={style.listPorudzbine}>
          {odobreneNarudzbine.map((narudzbina,index) => {
            return <MenyCardPorudzbine order={narudzbina} />;
          })}
        </div>
      </div>
      <div className={style.OdobrenePorudzbine}>
        <h3>Odbijene porudzbine</h3>
        <div className={style.listPorudzbine}>
          {odbijeneNarudzbine.map((narudzbina,index) => {
            return <MenyCardPorudzbine order={narudzbina} />;
          })}
        </div>
      </div>
    </div>
  );
};
export default Porudzbine;
