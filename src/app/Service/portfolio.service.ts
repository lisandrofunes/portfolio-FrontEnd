import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Portfolio } from '../models/portfolio';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  // url='http://localhost:8080/portfolio/';
  url='https://backend-portfolio-6goi.onrender.com/portfolio/'
  constructor(private http: HttpClient) { }

  // getPortfolio():Observable<any>{
  // return this.http.get(this.url+'lista');
  // }

  getPortfolio(){
    return this.http.get<Portfolio[]>(this.url+'lista');
  }

  editPortfolio(id:string, portfolio: FormData):Observable<any>{
    return this.http.put(this.url+'update/'+id, portfolio);
  }

  deletePortfolio(id:number):Observable<any>{
    return this.http.delete<any>(this.url+`delete/${id}`);
  }

  addPortfolio(portfolio: FormData):Observable<any>{
    return this.http.post<any>(this.url+ 'create', portfolio)
  }

  detail(id: number): Observable<Portfolio> {
    return this.http.get<Portfolio>(this.url + `detail/${id}`);
  }

  detailx(id: number): Observable<Portfolio[]> {
    return this.http.get<Portfolio[]>(this.url + `detail/${id}`);
  }
}
