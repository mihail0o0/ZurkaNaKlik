
import Icon from "../lib/icon";
import style from "./style.module.css";
type DisplayKardProps = {
  text: string;
  icon: string;
};
const DisplayKard = ({ text, icon }: DisplayKardProps) => {
  return (
    <div className={style.LabeleIkone}>
      <Icon icon={icon} />
      <label> {text}</label>
    </div>
  );
};
export default DisplayKard;
