import { Injectable } from '@angular/core';
import { UserServiceService } from './../user-service.service';
import { Router } from '@angular/router';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  data: any;
	constructor(public Router:Router, public UserServiceService:UserServiceService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.UserServiceService.getUserLoginStatus().subscribe((resData)=>{
        this.data=this.UserServiceService.getUserInfo()
      console.log("AdminGuard -> constructor -> this.UserServiceService.getUserInfo()", this.UserServiceService.getUserInfo())
      })
  
      if (!this.data) {
        this.UserServiceService.getUserInfo
        console.log("AdminGuard -> constructor -> this.UserServiceService.getUserInfo", this.UserServiceService.getUserInfo())
        return true
      }
      else{
      this.Router.navigate(['/Home'])
        return false
  
      }
    }
  
  }
  
