import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../services/login-service.service";
import {Router} from "@angular/router";
import swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: any = null;
  loginForm: FormGroup = null;
  registerButton: any = false;

  constructor(private spinner: NgxSpinnerService,
              private formBuilder: FormBuilder,
              private loginService: LoginService,
              private router: Router) {
    if (this.loginService.isLogged())
      this.router.navigate(['/home']);
    this.initLoginForm();
  }

  private initLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      clave: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login() {
    if (!this.loginForm.dirty) {
      return;
    }
    const loginData = this.loginForm.getRawValue();
    this.spinner.show();
    this.loginService.doLogin(loginData.email, loginData.clave).subscribe(resp => {
      this.spinner.hide();
      console.log(resp);
      if (resp['token'] !== undefined) {
        this.router.navigate(['/home']);
      } else {
        this.message = resp['msg'];
      }
    }, err => {
      this.spinner.hide();
      this.message = err.error['msg'];
      this.registerButton = true;
    });
  }

  register() {
    if (!this.loginForm.dirty) {
      return;
    }
    this.spinner.show();
    const loginData = this.loginForm.getRawValue();
    this.loginService.doRegister(loginData.email, loginData.clave).subscribe(resp => {
      this.spinner.hide();
      swal.fire('Registrado', 'El email fue dado de alta, verifique su correo.','success').then(resp => {
        this.router.navigateByUrl('/home');
      });
    }, err => {
      this.spinner.hide();
      if( err.error['text'] === 'OK'){
        swal.fire('Registrado', 'El email fue dado de alta, verifique su correo','success').then( resp => {
          this.router.navigateByUrl('/home');
        });
      } else {
        swal.fire('Error', 'No se pudo dar de alta el email solicitado.', 'error');
      }
    });
  }
}
