export type roleType = 'user' | 'admin'

export type User = {
    id: number
    name : string
    email: string
    password: string
    role : roleType,
    adminId : number
}