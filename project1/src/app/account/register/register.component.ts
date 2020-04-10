import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { RegisterModel } from '../../model/register.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuoteService } from '../../service/quote.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css','../login/login.component.css']
})
export class RegisterComponent implements OnInit {
  user : RegisterModel = new RegisterModel();
  registerForm : FormGroup;

  // name : string;
  // email : string;
  // password_one : string;
  // password_second : string;
 
  constructor(private _router : Router, private formBuilder: FormBuilder, private _quoteService : QuoteService) { }
  // User = [ {'email':'' , 'password':'', 'confirm':''}]

  // getValue(value1, value2, value3){
  //   this.User[0]['email'] = value1;
  //   this.User[0]['password'] = value2;
  //   this.User[0]['confirm'] = value3;
  //   console.log("email : ",this.User[0]['email']);
  //   console.log("password : ",this.User[0]['password']);
  //   console.log("confirm : ",this.User[0]['confirm']);
  // }

  switchToLogin(){
    console.log("Go to login");
    this._router.navigate(['login']);
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'username' : [this.user.username, [
        Validators.required
      ]],
      'email' : [this.user.email,[ 
        Validators.required,
        Validators.email
      ]],
      'password' : [this.user.password, [
        Validators.required,
        Validators.minLength(8)
      ]]
      ,
      'confirmpassword' : [this.user.confirmpassword, [
        Validators.required,
        Validators.minLength(8)
      ]]


    });



  }

  onRegisterSubmit(){
    // alert(this.user.name + ' ' + this.user.email + ' ' + this.user.password + this.user.confirm)
    if( this.user.password != this.user.confirmpassword){
      alert("passwords don't match");
    }else{
      // alert("Welcome");
      console.log(this.user);
      this._quoteService.userRegistration(this.user).subscribe((data: any) => {
         console.log('data recieved = '+data)
         this._router.navigate(['login']);

        },(err : HttpErrorResponse)=>{
          alert(err.message);
        });


    }
  }
}
