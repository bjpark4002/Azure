import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterModel } from '../../model/register.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuoteService } from 'src/app/service/quote.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // isLoginError : boolean = false;
  constructor(private _router: Router, private formBuilder: FormBuilder, private _quoteService : QuoteService) { }

  user: RegisterModel = new RegisterModel();
  registerForm: FormGroup;

  userLogin(_username, _password) {
    this.user.email = _username;
    this.user.password = _password;
    console.log("email : ", this.user.email);
    console.log("password : ", this.user.password);

    this._quoteService.userAuthentication(_username, _password).subscribe((data: any) => {
      localStorage.setItem('userToken',data.access_token);
      this._router.navigate(['/main']);

    }, 
    (err : HttpErrorResponse)=>{
      alert("Email/Password incorrect");

    }) ;
  }
  switchToRegister() {
    console.log("Go to Register");
    this._router.navigate(['register']);
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'email': [this.user.email, [
        Validators.required,
        Validators.email
      ]],
      'password': [this.user.password, [
        Validators.required,
        Validators.minLength(8)
      ]]
    });
  }


}
