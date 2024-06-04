import Icon from "../lib/icon";
import style from "./style.module.css";

type Props = {
  images: (string | undefined | null)[];
};

const ImageGallery = ({ images }: Props) => {
  console.log(images);

  return (
    <>
      <div className={style.container}>
        {images.map((image) => {
          if (!image) return;
          return (
            <div
              key={image}
              style={{ backgroundImage: `url(${image})` }}
              className={style.image}
            >
              <div className={style.Delete}>
                <Icon
                  icon="delete"
                  classes="colorWhite cursorPointer"
                  fontSize="24px"
                  iconMargin="0"
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ImageGallery;
