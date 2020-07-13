export interface User {
    email: string,
    password: string,
    first_name: string,
    middle_name: string,
    last_name: string,
    department: string,
    position:string,
    role:string,
    address: {
        country: string,
        city: string,
        street: string,
        phone: string,
    }
}