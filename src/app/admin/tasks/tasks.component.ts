import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../http/services/api.service';
// import {BASE_URL} from '../../../app/app.module';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor(private httpService: ApiService) { }

  ngOnInit(): void {
    let params = {
      id:1,
      page:3
    }
    this.httpService.getData('http://jsonplaceholder.typicode.com/posts')
      .subscribe(
        (data) => {
          console.log('data', data.body)
        },
        (error) => {
          console.log('Error occured', error)
        }
      )
  }

}
