import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { Project } from './models/project';
import { Project } from '../../projects/models/project';
// import { Document } from './models/document';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from 'src/app/app.module';
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  project_id;
  project: Project = null;
  fileUrl;
  metaInfo: string = '';
  files: Array<any> = [];
  links: Array<any> = [];
  linkControl:FormControl;
  constructor(private routeParams: ActivatedRoute, private sanitizer: DomSanitizer, private http: HttpClient) {
    this.project_id = routeParams.snapshot.params.id;
    this.metaInfo = 'project/' + this.project_id;
    this.linkControl = new FormControl('',Validators.pattern(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig))
  }

  ngOnInit(): void {
    /** get service data for project by ID */
    this.http.get<Project>(BASE_API_URL + 'api/project/' + this.project_id)
      .subscribe(project => {
        this.project = project[0];
        for(const{file:f,link:l} of this.project.documents){
          if(f){
            this.files.push(f);
          }
          if(l){
            this.links.push(l)
          }
        }
      })
  }
  uploadLink(){
    this.http.post(BASE_API_URL+'api/project/'+this.project_id,{link:this.linkControl.value}).subscribe(res=>{
      console.log(res);
    })

  }
  download(url, filename) {
    fetch(url).then(function (t) {
      return t.blob().then((blob) => {
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.setAttribute("download", filename);
        a.click();
      }
      );
    });
  }
}
