import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from '../../app.module';

@Injectable({
  providedIn: 'root'
})
export class UserUniqueService {
  constructor(private http: HttpClient) { }
  checkExistingUser(email: string): any {
   return this.http.get(BASE_API_URL + 'api/user/unique/?email=' + email)
    // .subscribe((user) => {
    //   console.log(user)
    //   return user;
    // })
  }
}
