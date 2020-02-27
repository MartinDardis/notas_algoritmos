import {Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login-service.service";
import {Router} from "@angular/router";
import {NotasService} from "./service/notas.service";

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {
  displayedColumns = ['label', 'grade', 'corrector'];
  notas: any = [];

  constructor(private loginService: LoginService,
              private notasService: NotasService,
              private router: Router) {
    if (!this.loginService.isLogged())
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

  calcularPromedio() {
    let suma = 0;
    let grades = 0;
    this.notas.forEach(nota => {
      if (nota.grade !== undefined && nota.grade.length > 0){
        suma += Number(nota.grade);
        grades += 1;
      }
    });
    return suma / grades;
  }
}
