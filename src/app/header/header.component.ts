import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../Auth/userAuth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated=false;

  constructor(private  userAuthService:UserAuthService) { }

  ngOnInit(): void {
    //this.isAuthenticated=this.userAuthService.getAuthenticationStatus();
    this.userAuthService.getAuthStatus().subscribe((response)=>{
    this.isAuthenticated=response;
    })
  }

  onLogout(){
    this.userAuthService.onLogoutUser();
  }
}
