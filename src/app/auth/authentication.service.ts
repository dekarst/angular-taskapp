import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from './models/user';
import { Router } from '@angular/router';
import { BASE_API_URL } from '../common/constants';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  public userSubject: BehaviorSubject<User>;
  user: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }
  login(loginObj) {
    return this.http.post<User>(BASE_API_URL + 'api/user/login', { email: loginObj.email, password: loginObj.password }, { observe: 'response' })
      .pipe(
        tap((res) => {
          console.log(res,res instanceof User)
          let token = res.headers.get('authorization');
          sessionStorage.setItem('token', token);
          let userInstance = new User(res.body);
          userInstance.removePassword();
          this.userSubject.next(userInstance);
          sessionStorage.setItem('user', JSON.stringify(userInstance));
          this.router.navigate(['/admin/dashboard'])
          return userInstance;
        })
      );
  }
  logout() {
    sessionStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }
  getToken() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    return user.token;
  }
  getLoggedUser() {
    return JSON.parse(sessionStorage.getItem('user'));
  }
}
