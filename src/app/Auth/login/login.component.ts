import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAuthService } from '../userAuth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userAuthService:UserAuthService) { }

  ngOnInit(): void {
  }

  onLogin(form:NgForm){
    if(form.invalid){
      return;
    }
    this.userAuthService.onLoginUser(form.value.email,form.value.password);
  }
}
