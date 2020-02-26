import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {BACKEND_URL} from "../../environments/environment";
import {map} from 'rxjs/operators';
import {UserLoginModel} from "../models/UserLoginModel";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userData: UserLoginModel = {isLogged: false, token: null};
  private statusObs = new Subject();

  constructor(private http: HttpClient) {
    const ud = sessionStorage.getItem('user');
    if (ud)
      this.userData = JSON.parse(ud);

  }

  doLogin(user, pass) {
    let body = new FormData();
    body.append("email", user);
    body.append("password", pass);
    return this.http.post(BACKEND_URL + "/user/signIn", body).pipe(map(esp => {
      if (esp['token'] !== undefined) {
        this.userData.isLogged = true;
        this.userData.token = esp['token'];
        sessionStorage.setItem('user', JSON.stringify(this.userData));
        this.statusObs.next(this.userData);
      }
      return esp;
    }));
  }

  doRegister(user, pass) {
    let body = new FormData();
    body.append("email", user);
    body.append("password", pass);
    return this.http.post(BACKEND_URL + "/user/signUp", body);
  }

  getStatusObs() {
    return this.statusObs;
  }

  isLogged() {
    return this.userData.isLogged;
  }

  getAppToken() {
    return this.userData.token;
  }

  doLogout() {
    this.userData.isLogged = false;
    this.userData.token = null;
    this.statusObs.next(this.userData);
    sessionStorage.setItem('user', JSON.stringify(this.userData));
  }
}
