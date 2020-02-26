import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginService} from "../../services/login-service.service";
import {BACKEND_URL} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  constructor(private http: HttpClient,
              private loginService: LoginService) {

  }

  getCalificaciones() {
    return this.http.get(BACKEND_URL + '/me/grades', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginService.getAppToken()
      })
    });
  }

}
