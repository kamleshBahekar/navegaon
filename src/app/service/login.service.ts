import { ApiCallService } from './api/apicall.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

constructor(private api:ApiCallService){}
loginUser(data) {
    return this.api.postData('authentication/login', data);
  }
  logout(data) {
    return this.api.postData('logout', data);
  }
}