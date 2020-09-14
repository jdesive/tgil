import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginResponse, User} from '../model/models';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: User;

  constructor(private http: HttpClient, private router: Router) { }

  login(usernamePar: string, passwordPar: string) {
    return this.http.post('http://localhost:8080/login', {username: usernamePar, password: passwordPar})
      .subscribe((data: LoginResponse) => {
        this.currentUser = data.user;
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log(data);
      });
  }

  logout(): void {
    localStorage.clear();
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    this.loadUser();
    return this.currentUser != null;
  }

  loadUser() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

}
