import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginUsuario } from '../models/login-usuario';
import { AuthService } from '../Service/auth.service';
import { TokenService } from '../Service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario: string = '';
  password: string = '';
  roles: string[] = [];
  errMsj: string = '';

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private ngxService: NgxUiLoaderService
    // private toastr: ToastrService
  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);

    this.ngxService.start();
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.ngxService.stop();
        this.isLogged = true;

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        // this.toastr.success('Bienvenido ' + data.nombreUsuario, 'OK', {
        //   timeOut: 3000, positionClass: 'toast-top-center'
        // });
        this.router.navigate(['/']);
      },
      err => {
        this.ngxService.stop();
        this.isLogged = false;
        this.errMsj = err.error.message;
        
        Swal.fire({
          title: 'Usuario o Constraseña iconrrectos',
          icon: 'error',
          confirmButtonColor: '#297762',
          color: 'var(--text)',
          background: 'var(--background1)',
        });
      }
    );
  }



}
