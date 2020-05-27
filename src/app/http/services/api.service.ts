import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, map, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }
  getData(url: any, options?: any): Observable<any> {
    let params = new HttpParams();
    Object.keys(options).forEach((key) => {
        params = params.append(key, options[key]);
    });

    return this.http.get<any>(url, { observe: 'response', params: params })
  }

}
