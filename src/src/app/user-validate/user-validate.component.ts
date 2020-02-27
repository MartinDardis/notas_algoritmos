import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {faCheck, faSpinner, faTimes} from "@fortawesome/free-solid-svg-icons";
import {SizeProp} from "@fortawesome/fontawesome-svg-core";
import {LoginService} from "../services/login-service.service";

@Component({
  selector: 'app-user-validate',
  templateUrl: './user-validate.component.html',
  styleUrls: ['./user-validate.component.css']
})
export class UserValidateComponent implements OnInit {
  resultIcon = faSpinner;
  resultIconSize: SizeProp = '3x';
  iconSpin: boolean = true;
  resultMsg = 'Procesando';
  showGoToLogin = false;

  constructor(private router: Router,
              private params: ActivatedRoute,
              private loginService: LoginService) {
    this.params.params.subscribe(params => {
        this.doAuth(params['token']);
    });
  }

  private doAuth(token) {
    this.loginService.doUserValidate(token).subscribe(res => {
      this.iconSpin = false;
      this.showGoToLogin = true;
      this.resultIcon = faCheck;
      this.resultMsg = 'Validacion exitosa!';
    },err => {
      console.log(err.error);
      this.iconSpin = false;
      this.showGoToLogin = true;
      this.resultIcon = faTimes;
      this.resultMsg = 'Hubo un error al realizar la validación.';
    });
  }

  ngOnInit() {
  }

  goToLongin() {
    this.router.navigateByUrl("/login");
  }
}
