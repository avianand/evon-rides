import { UserTypes } from '../Types/types';


export interface User {
    name: string
    phone: string
    accessToken: string
    refreshToken: string
    userId: string
    city: string
    type: UserTypes
    email?: string
}