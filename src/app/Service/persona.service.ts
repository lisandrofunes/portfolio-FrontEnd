import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  // url='http://localhost:8080/persona/';
  url='https://backend-portfolio-6goi.onrender.com/persona/'
  constructor(private http: HttpClient) { }

  getPersona(){
    return this.http.get<Persona[]>(this.url+'lista');
  }

  editPersona(id:string, persona: FormData):Observable<any>{
    return this.http.put(this.url+'update/'+id, persona);
  }

  deletePersona(id:number):Observable<any>{
    return this.http.delete<any>(this.url+`delete/${id}`);
  }

  addPersona(persona: FormData):Observable<any>{
    return this.http.post<any>(this.url+ 'create', persona)
  }

  detail(id: number): Observable<Persona> {
    return this.http.get<Persona>(this.url + `detail/${id}`);
  }

}
