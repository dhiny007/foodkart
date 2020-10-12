import { Component, OnInit } from '@angular/core';
import { UserAuthService } from './Auth/userAuth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private userAuthService:UserAuthService){}

  ngOnInit(){
    this.userAuthService.autoLogin();
  }
}
