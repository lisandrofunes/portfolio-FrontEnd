import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Email } from '../models/email';

@Injectable({
  providedIn: 'root'
})
export class EmailSenderService {

  // url='http://localhost:8080/correo/';
  url='https://backend-portfolio-6goi.onrender.com/correo/'
  constructor(private http: HttpClient) { }


  sendEmail(email: Email):Observable<any>{
    return this.http.post<any>(this.url+ 'send', email)
  }
}
