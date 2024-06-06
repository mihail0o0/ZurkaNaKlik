import style from "./style.module.css";

type Props = {
  image: string | null | undefined;
};

const ImageOverview = ({ image }: Props) => {
  const defaultImage = "/images/imageNotFound.jpg";

  const displayImage = `url(${image ?? defaultImage})`;
  console.log(displayImage);

  return (
    <div className={style.ImageContainer}>
      <div className={style.Image} style={{ backgroundImage: displayImage }}></div>
    </div>
  );
};

export default ImageOverview;
