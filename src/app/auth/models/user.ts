
export class User {
    _id: string;
    email: string;
    password: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    department: any;
    phone: string;
    position: any;
    role: any;
    address: {
        country: string
        city: string,
        street: string,
        zip: number
    }
    public instance: User;
    constructor(data: any) {
        this.setEmail(data.email);
        this.setPassword(data.password);
        this.setFirstName(data.first_name);
        this.setMiddleName(data.middle_name);
        this.setLastName(data.last_name);
        this.setAddress(data.address);
        this.setRole(data.role);
        this.setDepartment(data.department);
        this.setPassword(data.password);
        this.setPhone(data.phone);
        this.instance = data;
    }
    // public static getInstance(data: any) {
    //     if (!this.instance) {
    //         this.instance = new User({ ...data })
    //     }
    //     this.instance = { ...data };
    //     return this.instance;

    // }
    removePassword() {
        delete this.password;
        return this;
    }
    setFirstName(first_name: string) {
        this.first_name = first_name || '';
    }
    getFirstName() {
        return this.first_name;
    }
    setMiddleName(middle_name: string) {
        this.middle_name = middle_name || '';
    }
    getMiddleName(middle_name: string) {
        this.middle_name = middle_name || '';
    }
    setLastName(last_name: string) {
        this.last_name = last_name;
    }

    getLastName() {
        return this.last_name;
    }
    setDepartment(department: any) {
        this.department = { ...department } || null;
    }
    getDepartment() {
        return this.department;
    }
    setAddress(address: any) {
        this.address = { ...address } || null;
    }
    getAddress(address: any) {
        return this.address;
    }
    setRole(role: any) {
        this.role = role || null;
    }
    getRole() {
        return this.role;
    }
    setPhone(phone: string) {
        this.phone = phone || null;
    }
    getPhone() {
        return this.phone;
    }
    setEmail(email: string) {
        this.email = email || '';
    }
    getEmail() {
        return this.email;
    }

    setPassword(password: string) {
        this.password = password || '';
    }
    getPassword() {
        return this.password;
    }
    getToken() {
        return sessionStorage.getItem('token');
    }
}