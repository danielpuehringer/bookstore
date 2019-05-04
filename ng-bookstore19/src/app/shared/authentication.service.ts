import {Injectable} from '@angular/core';
import {isNullOrUndefined} from "util";
import {HttpClient} from "@angular/common/http";
import * as decode from 'jwt-decode';
import {retry} from 'rxjs/operators';
import {Observable} from "rxjs";
//import {User} from "./user";NOTE: do not use this class, use the interface because of result

//npm install --save-dev jwt-decode

interface User {
    result: {
        created_at: Date,
        email: string,
        id: number,
        name: string,
        updated_at: Date,
        isAdmin: boolean
    }
}

@Injectable()
export class AuthService {

    private api:string = 'http://bookstore19.s1610456027.student.kwmhgb.at/api';//'http://localhost:8080/api/auth';
    private user: User;

    constructor(private http: HttpClient) {
    }

    login(email: string, password: string ) {
        return this.http.post(`${this.api}/auth/login`, {'email': email, 'password': password});
    }

    public setCurrentUserId(){
        this.http.get<User>(`${this.api}/user`).pipe(retry(3)).subscribe(res =>{
                localStorage.setItem('userId', res.result.id.toString());
            }
        );
    }

    public getUser(user_id: number): Observable<any> {
        return this.http.get(`${this.api}/user/${user_id}`);
    }

    public getCurrentUserId(){
        return Number.parseInt(localStorage.getItem('userId'));
    }

    public isAdmin(): boolean{
        let state: number = Number.parseInt(localStorage.getItem('isAdmin'));
        return state === 1;
    }

    public setLocalStorage(token: string) {
        const decodedToken = decode(token);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', decodedToken.user.id);
        localStorage.setItem('isAdmin', decodedToken.user.isAdmin);
    }

    logout() {
        this.http.post(`${this.api}/auth/logout`, {});
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("isAdmin");
    }

    public isLoggedIn() {
        return !isNullOrUndefined(localStorage.getItem("token"));
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }
}