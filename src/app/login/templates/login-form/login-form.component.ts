import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent{
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  login(){
    console.log(this.loginForm)
  }
}
