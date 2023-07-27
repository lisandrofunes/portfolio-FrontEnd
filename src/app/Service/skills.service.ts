import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../models/skill';
import { Habilidad } from '../skills/skills.component';
// import { Habilidad } from '../skills/skills.component';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  // url='http://localhost:8080/habilidad/';
  url='https://backend-portfolio-6goi.onrender.com/habilidad/'
  constructor(private http: HttpClient) { }

  getHabilidades():Observable<Skill[]>{
  return this.http.get<Skill[]>(this.url+'lista');
  }

  editHabilidad(id:string, skill: Habilidad):Observable<any>{
    return this.http.put(this.url+'update/'+id, skill);
  }

  deleteHabilidad(id:number):Observable<any>{
    return this.http.delete<any>(this.url+`delete/${id}`);
  }

  addHabilidad(habilidad: Habilidad):Observable<any>{
    return this.http.post<any>(this.url+ 'create', habilidad)
  }

  detail(id: number): Observable<Skill> {
    return this.http.get<Skill>(this.url + `detail/${id}`);
  }

}

