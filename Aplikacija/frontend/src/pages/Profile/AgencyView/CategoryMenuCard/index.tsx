import MenyCardView from "@/components/MenyCardView";
import style from "./style.module.css";
import { useGetImageQuery } from "@/store/api/endpoints/images";

type Props = {
  category: GetMenuDTO;
};

// const MenuList = ({ getMenuDTO }: MenuListProps) => (
//   <div className={style.MenyList}>
//     {getMenuDTO.map((catering) =>
//       Array.isArray(catering.meniKeteringa) ? (
//         catering.meniKeteringa.map((menu) => <MenyCardView meni={menu} />)
//       ) : (
//         <div>No menus available</div>
//       )
//     )}
//   </div>
// );

const CategoryMenuCard = ({ category }: Props) => {
  // const {data: image} = useGetImageQuery(cate);

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
