import { User } from "@/models/user";

export type LoginPayload = {
  email: string;
  password: string;
};

export interface LoginResponse {
  accessToken: string;
  user: User;
}

export type CreateUserDTO = Required<Omit<User, "id" | "numberOfGrades" | "description" | "grade" | "doesDelivery" | "deliveryPrice">> & {
  password: string;
  repeatPassword: string;
};

// TODO fali updateUserDTO