import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from './models/project';
import { Document } from './models/document';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  project_id;
  project: Project;
  fileUrl;
  documents: Array<Document> = [];
  constructor(private routeParams: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.project_id = routeParams.snapshot.params.id;
    let content = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';
    this.project = {
      project_id: this.project_id,
      name: "PROJECT #2789",
      title: "Project for workflow management",
      description: content,
      manager: "Gerogi Ivanov",
      start_date: new Date("2020-04-10").toISOString().split('T')[0],
      end_date: new Date("2021-06-10").toISOString().split('T')[0],
      documents: [
        { type: 'link', name: 'Document N 1', content: 'https://www.google.com/' },
        { type: 'link', name: 'Document N 2', content: 'https://www.google.com/' },
        { type: 'file', name: 'Intstructions', content: '2020-04-28T15:02:16.065Z_pdf-sample.pdf' },
        { type: 'file', name: 'Business cases', content: '2020-04-28T14:33:17.852Z_Screenshot from 2019-10-27 21-51-36.png' }]
      }

  }

  ngOnInit(): void {
    /** get service data for project by ID */
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
