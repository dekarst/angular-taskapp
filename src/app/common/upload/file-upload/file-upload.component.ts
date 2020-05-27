import { Component, OnInit } from '@angular/core';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import {HttpResponse} from '@angular/common/http';


const uploadURL: string = "http://localhost:5000/api/file/upload/";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})

export class FileUploadComponent implements OnInit {

  public files: any = [];
  public uploader: FileUploader = new FileUploader({
    url: uploadURL,
    itemAlias: 'fileUpload',
    disableMultipart:false,
    headers: [
      { name: 'Access-Control-Allow-Origin', value: 'http://localhost:5000/' },
    ]
  });
  constructor(private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.toastr.success('File successfully uploaded!');
      console.log(JSON.parse(response))
      this.files.push(JSON.parse(response));
    }
  }
  removeFile(file) { };
}
