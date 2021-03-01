import { environment } from './../../../environments/environment';
import { UserServiceService } from './../user-service.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';


@Injectable()
export class ApiCallService  {

  token: any = {};
  uploadSub = new BehaviorSubject<any>(0);
	baseUrl: string;

  constructor(private http: HttpClient, private userService: UserServiceService,public Router:Router) {
	this.baseUrl= environment.apiUrl;
  
  }

  setHeaderToken(token) {
    this.token = token;
  }

  getHeader() {
    const token = this.userService.getUserToken();
    this.token = token ? token : '';
    return {
      headers: {
        authorization: this.token
      }
    };
  }

  public getData(subUrl: string, token = true): Promise<any> {
    return new Promise((resolve, reject) => {
      const request: string = this.baseUrl + subUrl;
      // // console.log('data', request);
      this.http
        .get(request,
          token ? this.getHeader() : {})
        .subscribe(
          data => resolve(data),
          error =>{
            if(error.status === 401){
              this.userService.logOut(); 
             }
            reject(error)
          }
        );
    });
  }

  public postData(subUrl: string, data: any, token = true): Promise<any> {
    return new Promise((resolve, reject) => {
      // console.log('Token :', token);
      // console.log('Data :', this.getHeader());
      const request: string = this.baseUrl + subUrl;
      this.http.post(request, data, token ? this.getHeader() : {})
        .subscribe(
          res => resolve(res),
          error => {
           if(error.status === 401){
            this.userService.logOut();
           }
            reject(error);
          }
        );
    });
  }

  public putData(subUrl: string, data: any, token = true): Promise<any> {
    // console.log('putdata call');
    return new Promise((resolve, reject) => {
      const request: string = this.baseUrl + subUrl;
      this.http
        .put(request,
          data,
          token ? this.getHeader() : {})
        .subscribe(
          res => resolve(res),
          error => {
            if(error.status === 401){
              this.userService.logOut();
             }
             reject(error)
          }
           
        );
    });
  }

  public deleteData(subUrl: string, token = true): Promise<any> {
    return new Promise((resolve, reject) => {
      const request: string = this.baseUrl + subUrl;
      this.http
        .delete(request,
          token ? this.getHeader() : {})
        .subscribe(
          res => resolve(res),
          error =>{
            if(error.status === 401){
              this.userService.logOut();
             }
            reject(error)
          }
          
        );
    });
  }

  public upload(file: any, url: any, token = true): Promise<any> {
    // console.log('url', url);

    return new Promise((resolve, reject) => {
      const uploadData = new FormData();
      for(var i = 0; i < file.length; i++) {
        uploadData.append('myFile'+i, file[i], file[i].name);
      }
      this.uploadSub.next(0);
      const request = this.http
        .post(url,
          uploadData,
          token ? { ...this.getHeader(), reportProgress: true, observe: 'events' } : { reportProgress: true, observe: 'events' })
        .subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            /* // console.log('Upload Progress :', (event['loaded'] / event['total']) * 100 + '%'); */
            // console.log('Event :', event['loaded'], event['total']);
            if (this.uploadSub.value !== null) {
              this.uploadSub.next((event['loaded'] / event['total']) * 100);
            } else {
              // Here Stop Uploading Request Manually
              request.unsubscribe();
            }
          } else if (event.type === HttpEventType.Response) {
            resolve(event.body);
          }
        },
          error =>{
            if(error.status === 401){
              this.userService.logOut();
             }
             reject(error)
          }
        );
    });
  }
}
