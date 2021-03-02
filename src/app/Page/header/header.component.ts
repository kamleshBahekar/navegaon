import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../service/user-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  data: any;
  Designation: any;
  Admin: boolean = false;


  constructor(public UserServiceService:UserServiceService) { }


  
  ngOnInit() {
    this.UserServiceService.getUserLoginStatus().subscribe((resData)=>{
      this.data = this.UserServiceService.getUserInfo()
      this.Designation = this.data.designation
  
    })
    if (this.Designation == "Admin") {
          this.Admin = true; 
        }
  }
  logout(){
    this.UserServiceService.logOut();
    //location.reload();
  }
}
