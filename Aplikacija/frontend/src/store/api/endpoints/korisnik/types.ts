import { Role } from "@/models/role";

export type AllUserData = {
    id: number;
    name: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: Role;
    profilePhoto?: string;
    location: string;
}