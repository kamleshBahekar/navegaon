import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  userInfo = new BehaviorSubject(null);
 
  constructor(public storage: CookieService ,public Router:Router ) { }

  addUserInfo(data) {
    this.storage.set('userInfo_e-learning', JSON.stringify(data));
    this.storage.set('userInfo_token', data.accessToken);
    this.userInfo.next(data);
    return;
  }

  getUserLoginStatus() {
      return this.userInfo;
  }

  getUserInfo() {
    console.log("userInfo_e-learning", this.storage.get('userInfo_e-learning'))
    if (this.storage.get('userInfo_e-learning')) {
      return JSON.parse(this.storage.get('userInfo_e-learning'));
    } else {
      return false;
    }
  }


  getUserToken() {
    if (this.storage.get('userInfo_e-learning')) {
      return this.storage.get('userInfo_token');
    } else {
      return false;
    }
  }

  
  
  logOut() {
    this.storage.deleteAll('../');
    this.storage.deleteAll('/');
    this.Router.navigate(["/auth/login"]);
  }

}


