export class User {

    public created_at: Date;
    public email: string;
    public id: number;
    public name: string;
    public updated_at: Date;
    public isAdmin: boolean;
    public firstName: string;
    public lastName: string;
    public address: string;

    constructor(
            created_at: Date,
            email: string,
            id: number,
            name: string,
            updated_at: Date,
            isAdmin: boolean,
            firstName: string,
            lastName: string,
            address: string
    ){

    }
}
