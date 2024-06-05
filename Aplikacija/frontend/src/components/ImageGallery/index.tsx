import { useDeleteUserOglasMutation } from "@/store/api/endpoints/oglas";
import Icon from "../lib/icon";
import style from "./style.module.css";
import { getRawLocation } from "@/utils/handleQueries";
import { DeleteOglasImageDTO } from "@/store/api/endpoints/images/types";
import { useDeleteOglasImageMutation } from "@/store/api/endpoints/images";

type Props = {
  idOglasa: number;
  imagePaths: string[];
  images: (string | undefined | null)[];
};

const ImageGallery = ({ idOglasa, imagePaths, images }: Props) => {
  const [deleteImageAction] = useDeleteOglasImageMutation();

  const handleDelete = async (index: number) => {
    const image = imagePaths[index];
    console.log(image);

    if (!image) return;
    const actionData: DeleteOglasImageDTO = {
      idOglasa,
      slikaPath: getRawLocation(image)!,
    };
    console.log(actionData);

    const result = await deleteImageAction(actionData);
    if ("error" in result) {
      return;
    }
  };

  return (
    <>
      <div className={style.container}>
        {images.map((image, index) => {
          if (!image) return;
          return (
            <div
              key={image}
              style={{ backgroundImage: `url(${image})` }}
              className={style.image}
            >
              <div className={style.Delete} onClick={() => handleDelete(index)}>
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
