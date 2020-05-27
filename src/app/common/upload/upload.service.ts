import { Injectable } from '@angular/core';
import { BASE_API_URL } from '../../app.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  uploadURL: string = "http://localhost:3000/api/file/upload/";;
  // uploadURL: string = "https://file.io";;


  constructor(private http: HttpClient) { }

  public upload(formData) {
    console.log('in service',formData)
    const headers = new HttpHeaders()
    .append("Access-Control-Allow-Origin","*")
    .append("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Authorization, Accept");
    
    return this.http.post<any>(this.uploadURL, formData, {
      reportProgress: true,
      observe: "events",
      // headers:headers
    })
  }
}
