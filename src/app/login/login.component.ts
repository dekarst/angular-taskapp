import { Component, OnInit } from '@angular/core';
import { User } from '../auth/models/user';
import { AuthenticationService } from '../auth/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidator } from './custom-validator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formSubmitted = false;
  public loginForm: FormGroup;
  hide: boolean = true;
  user = { email: '', password: '' };
  // items = [
  //   { id: 1, name: 'Python', image: 'python.png'},
  //   { id: 2, name: 'Node Js', image: 'nodejs.jpg' },
  //   { id: 3, name: 'Java', image: 'java.jpg' },
  //   { id: 4, name: 'PHP', image: 'php.jpg', disabled: true },
  //   { id: 5, name: 'Django', image: 'django.jpg' },
  //   { id: 6, name: 'Angular', image: 'angular.png' },
  //   { id: 7, name: 'Vue', image: 'vue.jpg' },
  //   { id: 8, name: 'ReactJs', image: 'reactjs.jpg' },
  // ];
  // selectedItems = [1,2];
  // selectedOptions = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private toaster: ToastrService) {
  }
  ngOnInit(): void {
    // this.selectedItems = [1]
    this.hide = true;
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    })
    this.send();
  }
  send() {
    console.log(this.loginForm.value);
  }
  get f() {
    return this.loginForm.controls;
  }
  get email() {
    console.log(this.loginForm.controls.email.errors)
    return this.loginForm.controls.email;
  }
  get password() {
    return this.loginForm.controls.password;
  }

  login() {
    this.formSubmitted = true;
    if (this.loginForm.invalid) {
      console.log('form is invalid');
      return;
    }
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe(res => {
      console.log(res, res instanceof User)
      if (res) this.toaster.success('Login successful');
      // this.router.navigateByUrl('/tasks')
    })

  }
}
