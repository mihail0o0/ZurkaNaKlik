import { User } from "@/models/user";

export type LoginPayload = {
  email: string;
  password: string;
};

export interface LoginResponse {
  accessToken: string;
  user: User;
}
