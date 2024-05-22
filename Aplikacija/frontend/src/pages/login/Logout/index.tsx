import { useAppDispatch } from "@/store";
import { logOut } from "@/store/auth";

const Logout = () => {
  const dispatch = useAppDispatch();

  dispatch(logOut());
  return <p>Logout</p>;
};

export default Logout;
