import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from 'src/app/common/constants';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { fromEvent, Observable } from 'rxjs';


@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {
  public projectForm: FormGroup;
  public range: FormGroup;
  public picker: MatDatepicker<Date>;
  public minDate: Date;
  employees = [];
  projectMembers = [];
  isSelectDisabled = false;
  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.projectMembers = [];
    this.getUsers(null);
    this.minDate = new Date();
    this.buildForm();
  }
  buildForm() {
    this.projectForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      start_date: [new Date(), [Validators.required]],
      end_date: ['', [Validators.required]],
    })
    // this.projectForm.controls.responsible_persons.valueChanges.pipe(
    //   debounceTime(10),
    //   distinctUntilChanged(),
    //   switchMap(value => { return this.fetchUsers(value) })
    // ).subscribe((employees) => this.employees = employees)

  }
  fetchUsers($event) {
    let query = $event ? $event.target.value : '';
    return this.http.get<any[]>(BASE_API_URL + 'api/user/manage?for_filter=true&query=' + query)

  }
  getUsers($event) {
    let query = $event ? $event.target.value : '';
    this.http.get<any[]>(BASE_API_URL + 'api/user/manage?for_filter=true&query=' + query)
      .subscribe(employees => {
        this.employees = employees;
      })
  }
  get f() {
    return this.projectForm.controls;
  }
  formatDate($event) {
    console.log('displayDate', $event.target.value)
  }
  displayFn($event) {
    console.log('display', $event.target.value)
  }
  onMembersChange($event) {
    this.projectMembers = $event.map(member => member._id)
  }
  createProject(formValue) {
    let start_date = this.projectForm.controls.start_date.value.toISOString().split('T')[0];
    let end_date = this.projectForm.controls.end_date.value.toISOString().split('T')[0];

    this.projectForm.controls.start_date.setValue(start_date);
    this.projectForm.controls.end_date.setValue(end_date);

    var data = Object.assign({ responsible_persons: this.projectMembers, documents: [] }, this.projectForm.value)
    console.log(data)
    this.http.post(BASE_API_URL + 'api/project/', data).subscribe(response => {
      console.log(response)
    })
  }
}
