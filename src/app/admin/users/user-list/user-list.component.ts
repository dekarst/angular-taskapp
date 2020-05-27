import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from '../../../app.module';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users:Object = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getUsers().subscribe(users => {
      console.log(users)
      this.users = users;
    })
  }
  getUsers() {
    return this.http.get(BASE_API_URL + 'api/user/manage');
  }
}
