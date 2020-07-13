import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs';
import {Observable} from 'rxjs';


const DOWNLOAD_URL = "http://localhost:3000/api/file/download/";
@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {

  constructor(private http: HttpClient) { }

 public fileDownload(file){
    let body = { filename: file }
    console.log(body)
    return this.http.post(DOWNLOAD_URL, body, {
      responseType: 'blob',
      headers: new HttpHeaders().append("Content-Type", "application/json")
    })
  }
}
