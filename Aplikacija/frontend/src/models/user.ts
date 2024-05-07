import { Role } from "./role";

export type User = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  role: Role;
  location?: string;
  lastName?: string;
  description?: string;
  grade?: number;
  numberOfGrades?: number;
  deosDelivery?: boolean;
  deliveryPrice?: number;
}
