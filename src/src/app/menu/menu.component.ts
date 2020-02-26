import {Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login-service.service";
import {Router} from "@angular/router";
import {UserLoginModel} from "../models/UserLoginModel";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  show = false;
  statusObs = null;

  constructor(private loginService: LoginService,
              private router: Router) {
    this.show = this.loginService.isLogged();
    this.statusObs = this.loginService.getStatusObs().subscribe((r: UserLoginModel) => {
      this.show = r.isLogged;
    });
  }

  ngOnInit() {
  }


  logout() {
    this.loginService.doLogout();
    this.router.navigate(['/']);
  }
}
