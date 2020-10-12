import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAuthService } from '../userAuth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userAuthService:UserAuthService) { }

  ngOnInit(): void {
  }

  onSignup(form:NgForm){
    if(form.invalid){
      return;
    }
    else{
      console.log('valid');
      this.userAuthService.onSignupUser(form.value.email,form.value.password);
    }
  }
}
