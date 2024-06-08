import MenyCardView from "@/components/MenyCardView";
import style from "./style.module.css";
import { useGetImageQuery } from "@/store/api/endpoints/images";

type Props = {
  category: GetMenuDTO;
};

const CategoryMenuCard = ({ category }: Props) => {
  return (
    <div>
      <h4 className={style.heading}>{category.naziv}</h4>
      {category.meniKeteringa.map((menu) => {
        return <MenyCardView meni={menu} />;
      })}
    </div>
  );
};

export default CategoryMenuCard;
