import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login-service.service";
import {Router} from "@angular/router";
import {NotasService} from "./service/notas.service";

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {
  displayedColumns = ['label','grade','corrector'];
  notas: Array<any> = [];

  constructor(private loginService: LoginService,
              private notasService: NotasService,
              private router: Router) {
    if ( !this.loginService.isLogged() )
      this.router.navigate(['/']);
    this.loadGrades();
  }

  ngOnInit() {
  }

  private loadGrades() {
    this.notasService.getCalificaciones().subscribe(resp => {
      this.notas = resp;
    });
  }
}
