import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SobreMi } from '../models/sobreMi';

@Injectable({
  providedIn: 'root'
})
export class SobreMiService {

  // url = 'http://localhost:8080/about/';
  url='https://backend-portfolio-6goi.onrender.com/about/'
  constructor(private http: HttpClient) { }

  getSobreMi() {
    return this.http.get<SobreMi[]>(this.url + 'lista');
  }

  editSobreMi(id: string, sobreMi: FormData): Observable<any> {
    return this.http.put(this.url + 'update/' + id, sobreMi);
  }

  deleteSobreMi(id: number): Observable<any> {
    return this.http.delete<any>(this.url + `delete/${id}`);
  }

  addSobreMi(sobreMi: FormData): Observable<any> {
    return this.http.post<any>(this.url + 'create', sobreMi)
  }

  detail(id: number): Observable<SobreMi> {
    return this.http.get<SobreMi>(this.url + `detail/${id}`);
  }

}
