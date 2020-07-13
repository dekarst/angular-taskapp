import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from 'src/app/app.module';

export interface Project {
  _id:string,
  title: string,
  description: string,
  start_date: Date,
  end_date: Date,
  responsible_persons: Array<any>,
  documents: Array<any>
}
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  more=false;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Project[]>(BASE_API_URL + 'api/project').subscribe(projects => {
      this.projects = projects;
      console.log(this.projects)
    })
  }

}
