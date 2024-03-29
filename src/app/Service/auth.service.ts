import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { JwtDTO } from '../models/jwt-dto';
import { LoginUsuario } from '../models/login-usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // login = false;

  // url="http://localhost:8080/auth/login";
  // currentUserSubject: BehaviorSubject<any>;
  // constructor(private http:HttpClient) {
  //   console.log("El servicio de autenticacion esta corriendo")
   
  //   this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')|| '{}'))
  // }

  // IniciarSesion(credenciales:any):Observable<any>{
  //   return this.http.post(this.url, credenciales).pipe(map(
  //     data=>{
  //       sessionStorage.setItem('currentUser', JSON.stringify(data));
  //       return data;
  //     },
  //   ))
  // }

  // authURL = 'http://localhost:8080/auth/';
  authURL = 'https://backend-portfolio-6goi.onrender.com/auth/';

  constructor(private httpClient: HttpClient) { }

  public login(login: LoginUsuario): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authURL + 'login', login);
  }

  isAdmin(): boolean{
    return false;
  }
}
