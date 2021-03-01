import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  Login: FormGroup;
  constructor(private fb: FormBuilder) { 
    this.Login = fb.group({
      'username':[null, Validators.required],
      'password' : [null, Validators.required],
      });
  }

  ngOnInit() {
  }

 LoginSubmit(){
   this.Login
   console.log(this.Login.value)
 }

}
