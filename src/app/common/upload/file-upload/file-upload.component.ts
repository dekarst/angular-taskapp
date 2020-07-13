import { Component, OnInit, Input } from '@angular/core';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import {HttpResponse} from '@angular/common/http';
import {BASE_API_URL} from '../../../app.module';


const uploadURL: string = "http://localhost:3000/api/";
// const uploadURL: string = "http://localhost:3000/api/file/upload/";


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})

export class FileUploadComponent implements OnInit {
  @Input() metaInfo:string;
  public files: any = [];
  public uploader: FileUploader; 
  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    this.uploader=new FileUploader({
      url: uploadURL+this.metaInfo,
      itemAlias: 'fileUpload',
      disableMultipart:false,
      headers: [
        { name: 'Access-Control-Allow-Origin', value: BASE_API_URL },
      ]
    });

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
