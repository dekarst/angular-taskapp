import { Injectable } from '@angular/core';
import { BASE_API_URL } from '../../app.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  uploadURL: string = "http://localhost:3000/api/file/upload/";;

  constructor(private http: HttpClient) { }

  public upload(formData) {
    console.log('in service',formData)
    return this.http.post<any>(this.uploadURL, formData, {
      reportProgress: true,
      observe: "events",
    })
  }
}
