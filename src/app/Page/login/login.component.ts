import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { LoginService }  from '../../service/login.service'
import { UserServiceService } from './../../service/user-service.service'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  Login: FormGroup;
  loading = false;
  constructor(private fb: FormBuilder, public LoginService: LoginService,private router: Router, private route: ActivatedRoute,  public  UserService:  UserServiceService ) { 
    this.Login = fb.group({
      'username':[null, Validators.compose([
				Validators.required,
				Validators.email,
				Validators.minLength(3),
				Validators.maxLength(320) 
			])
			],
      'password' : [null, Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			]
      });
  }

  ngOnInit() {
  }

 LoginSubmit(){
   this.Login
   console.log(this.Login.value)
   const authData = {
    email: this.Login.value.username,
    password: this.Login.value.password,
  };
  this.loading = true;
  this.LoginService.loginUser(authData).then((resData)=>{
    console.log(resData)
    if (resData.status == "SUCCESS") {
      this.UserService.addUserInfo(resData.data);
      this.router.navigate(['/Home'])
      window.location.reload()	
    }
  }).catch((err)=>{
    this.loading = false;
  });
 }

}
