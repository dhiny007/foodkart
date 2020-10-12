import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn:"root"
})
export class UserAuthService{

  private authenticationStatus=new BehaviorSubject<boolean>(false);
  private isAuthenticated=false;
  token:string;

  constructor(private http:HttpClient){}

  onSignupUser(email:string,password:string){
    const userData:User={email:email,password:password};
    //console.log(userData);
    this.http.post("http://localhost:3000/auth/signup",userData)
    .subscribe(response => {
      console.log(response);
      console.log('Signup Successful');
    })
  }

  getAuthenticationStatus(){
    return this.isAuthenticated;
  }

  getAuthStatus(){
    return this.authenticationStatus;
  }

  onLoginUser(email:string,password:string){
    const loginData:User={email:email,password:password};
    this.http.post<{message:string,token:string,expiresIn:number,id:string}>('http://localhost:3000/auth/login',loginData)
    .subscribe(response => {
      console.log(response);
      const token=response.token;
      this.token=token;
      const id=response.id;
      if(token){
        this.authenticationStatus.next(true);
        this.isAuthenticated=true;
        const expiresIn=response.expiresIn;
        const now=new Date();
        const expirationDuration=new Date(now.getTime() + (expiresIn*1000));
        this.saveAuthData(token,expirationDuration,id);
        }
      }
    )
  }

  saveAuthData(token:string,expirationDuration:Date,id:string){
    localStorage.setItem('token',token);
    localStorage.setItem('expirationDuration',expirationDuration.toISOString()),
    localStorage.setItem('userId',id);
  }

  clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDuration');
    localStorage.removeItem('userId');
  }

  getAuthData(){
    const token=localStorage.getItem('token');
    const expirationDuration=localStorage.getItem('expirationDuration');
    const userId=localStorage.getItem('userId');
    if(!token || !expirationDuration){
      return;
    }
  return {
    token:token,
    expirationDuration:new Date(expirationDuration),
    userId:userId
    }
  }

  private setAuthTimer(duration:number){
    console.log(duration);
    setTimeout(()=>{
      this.clearAuthData()
    },duration*1000);
  }

  autoLogin(){
    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
    }
    const now=new Date();
    const expirationTime=authInformation.expirationDuration.getTime() - now.getTime();
    if(expirationTime>0){
      this.token=authInformation.token;
      console.log(expirationTime);
      this.setAuthTimer(expirationTime/1000);
      this.authenticationStatus.next(true);
      this.isAuthenticated=true;
    }
  }
}
