import { User } from "@/models/user";

export interface AuthState {
    token: string | null;
    user: User | null;
}