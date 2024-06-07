import { useRef, useState } from "react";
import Icon from "../lib/icon";
import style from "./style.module.css";

type Props = {
  image: string | null | undefined;
  tipoviProslava?: string;
};

const ImageOverview = ({ image, tipoviProslava }: Props) => {
  const defaultImage = "/images/imageNotFound.jpg";
  const fullscreenGallery = useRef<HTMLDivElement | null>(null);

  const [visible, setVisible] = useState(false);

  const displayImage = `url(${image ?? defaultImage})`;

  const handleClickOff = () => {
    setVisible(false)
  };

  const handleLeft = () => {
    alert("FUK");
  };

  const handleRight = () => {
    alert("FUK");
  };

  return (
    <>
      <div className={style.ImageContainer}>
        <div
        onClick={() => setVisible(true)}
          className={style.Image}
          style={{ backgroundImage: displayImage }}
        ></div>
        {tipoviProslava && (
          <div className={style.tipoviProslavaOverlay}>
            <p>Zurka, proslava</p>
          </div>
        )}
      </div>
      <div
        style={{ visibility: `${visible ? "visible" : "hidden"}` }}
        className={style.fullscreenContainer}
        onClick={handleLeft}
      >
        <div className={style.Controller}>
          <Icon iconMargin="0" classes="colorWhite" icon="arrow_back_ios" />
        </div>
        <div
          className={style.hugeImage}
          style={{ backgroundImage: displayImage }}
        ></div>
        <div className={style.Controller} onClick={handleRight}>
          <Icon iconMargin="0" classes="colorWhite" icon="arrow_forward_ios" />
        </div>

        <div className={style.clickOffTarget} onClick={handleClickOff}></div>
      </div>
    </>
  );
};

export default ImageOverview;
