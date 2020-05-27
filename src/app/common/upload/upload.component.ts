import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  providers:[UploadService]
})
export class UploadComponent implements OnInit {

  @ViewChild('fileUpload', { static: true }) fileUpload: ElementRef;
  files = [];

  constructor(private uploadService: UploadService) { }

  ngOnInit(): void { }

  uploadFile(file) {
    const formData = new FormData();
    formData.append('file',file.data);
    console.log(formData)
    file.inProgress = true;
    this.uploadService.upload(formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total); break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`${file.data.name} upload file failed`);
      })).subscribe((event) => {
        if (typeof event === 'object') {
          console.log('body',event)
        }
      })
  }

  uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach((file) => {
      this.uploadFile(file);
    })
  }

  onClick() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = ($event) => {
      console.log('here',$event.target.files,fileUpload.files)
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        console.log('file',file)

        this.files.push({ data: file, inProgress: false, progress: 0 })
      }
      this.uploadFiles();
    }
    fileUpload.click();
  }
}
