import { Role } from "./role";

// TODO mozda mi trebaju i ostali property
export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  role: Role;
  location: string;
}
