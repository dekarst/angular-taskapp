import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '../common/notification/services/notify.service';
import { User } from './models/user.model';
import { Department } from './models/department';
import { Position } from './models/position';
import { Country } from './models/country';
import { City } from './models/city';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AutocompleteComponent } from '../common/autocomplete/autocomplete.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { BASE_API_URL } from '../common/constants';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  @ViewChild(AutocompleteComponent, { static: false }) autocomplete: AutocompleteComponent;

  user: User;
  departmentList: Array<Department> = [];
  positionList: Array<Position> = [];
  countryList: Array<any> = [];
  cityList: Array<any> = [];
  country: any = null;
  city: any = null;
  department: any = null;
  position: any = null;
  hide: boolean = true;
  query: Subject<any> = new Subject()
  search: string = '';
  hasAutocompleteErrors = true;
  autocomlpeteFieldError: any = {}
  roles = ['user', 'manager', 'admin'];
  editMode: boolean = false;
  user_id: string = '';

  public registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpClient,
    private noficationService: NotifyService,
    private route: ActivatedRoute,
  ) {
    this.search = '';
    this.autocomlpeteFieldError = { country: true, city: true, department: true, position: true }
    this.query.next({ query: this.search, hasError: true });
    this.setQueryObserver();
  }

  ngOnInit(): void {
    this.hasAutocompleteErrors = !this.country || !this.city || !this.department || !this.position;
    this.user = { first_name: '', middle_name: '', last_name: '', email: '', password: '', department: '', position: '', role: 'user', address: { country: '', city: '', street: '', phone: '000-000' } }
    this.getCountryList()
      .subscribe((data: Country[]) => {
        this.countryList = data;
      });
    this.getCityList()
      .subscribe((data: City[]) => {
        this.cityList = data;
      });

    this.getDepartmentList()
      .subscribe((data: Department[]) => {
        this.departmentList = data;
      });
    this.getPositionList()
      .subscribe((data: Position[]) => {
        this.positionList = data;
      });
    this.route.paramMap.subscribe(params => {
      this.editMode = params.get('_id') ? true : false;
      this.user_id = params.get('_id');
      this.hasAutocompleteErrors = false;
      this.getUser(this.user_id).subscribe(user => {
        this.user = { ...user };
        this.autocomlpeteFieldError = { country: false, city: false, department: false, position: false }
        this.buildForm();
      });
      if(!this.user_id){
        this.buildForm();
      }
    })
  }
  
  buildForm() {
    this.registerForm = this.fb.group({
      first_name: [this.user.first_name, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      middle_name: [this.user.middle_name, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      last_name: [this.user.last_name, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: '',
      address: this.fb.group({
        street: [this.user.address.street, [Validators.required]],
        phone: [this.user.address.phone, [Validators.required, Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g)]]
      }),
      role: [this.user.role, [Validators.required]],
    })
    this.registerForm.controls.role.setValue(this.user.role);
  }
  setQueryObserver() {
    this.query.asObservable().pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(query => this.search = query.query.toLowerCase().trim())
  }
  getDepartmentList() {
    return this.httpService.get<any[]>(BASE_API_URL + 'api/department/?name=' + this.search)
  }
  getCountryList() {
    return this.httpService.get<any[]>(BASE_API_URL + 'api/address/country/?name=' + this.search)
  }
  getCityList() {
    return this.httpService.get<any[]>(BASE_API_URL + 'api/address/city/?name=' + this.search)
  }
  getPositionList() {
    return this.httpService.get<any[]>(BASE_API_URL + 'api/position/?name=' + this.search)
  }
  getQuery(query, field) {
    this.autocomlpeteFieldError[field] = query.hasError;
    this.setAutocompleteError();
    this.query.next(query);
    this.query.pipe(map(query => query.query.toLowerCase())).subscribe(query => this.search = query);
    this['get' + field.charAt(0).toUpperCase() + field.slice(1) + 'List']().subscribe(data => {
      this[field + 'List'] = data ? data : [];
    });
  }
  getUser(user_id) {
    return this.httpService.get<any>(BASE_API_URL + 'api/user/manage/' + user_id);
  }
  get first_name() {
    return this.registerForm.controls.first_name;
  }
  get middle_name() {
    return this.registerForm.controls.middle_name;
  }
  get last_name() {
    return this.registerForm.controls.last_name;
  }
  get email() {
    return this.registerForm.controls.email;
  }
  get password() {
    return this.registerForm.controls.password;
  }
  get address() {
    return this.registerForm.controls.address;
  }
  get street() {
    let addressGroup = <FormGroup>this.registerForm.controls.address;
    return addressGroup.controls.street;
  }
  get phone() {
    let addressGroup = <FormGroup>this.registerForm.controls.address;
    return addressGroup.controls.phone;
  }
  get role() {
    return this.registerForm.controls.role;
  }
  setRole() {
    this.user.role = this.registerForm.controls.role.value;
  }
  setPosition(position: any) {
    if (!position) return;
    this.position = position[0]._id;
  }
  setCountry(country: any) {
    if (!country) return;
    this.country = country[0]._id;
  }
  setCity(city: any) {
    if (!city) return;
    this.city = city[0]._id;
  }
  setDepartment(department: any) {
    if (!department) return;
    this.department = department[0]._id;
  }
  setAutocompleteError() {
    this.hasAutocompleteErrors = false;
    this.hasAutocompleteErrors = Object.values(this.autocomlpeteFieldError).includes(true);
  }
  register(instance: User) {
    if (this.hasAutocompleteErrors || this.registerForm.invalid) return;
    this.user = instance;
    this.user.address.city = this.city;
    this.user.address.country = this.country;
    this.user.position = this.position;
    this.user.department = this.department;
    this.user = Object.assign({}, this.user);
    if (!this.editMode) {
      this.httpService.post(BASE_API_URL + 'api/user/register/', this.user).subscribe(res => {
        console.log(res)
        this.noficationService.notifySubject.next('Registration successful');
        this.noficationService.notify('success');
      })
    } else {
      if (!this.user.password) {
        delete this.user.password;
      }
      this.httpService.patch(BASE_API_URL + 'api/user/manage/' + this.user_id, this.user).subscribe(res => {
        console.log(res)
        this.noficationService.notifySubject.next('Update successful');
        this.noficationService.notify('success');
      })

    }
    console.log(this.user);
  }
}
