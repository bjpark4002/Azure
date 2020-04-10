import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Quote } from '../model/quote.model';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { RegisterModel } from '../model/register.model';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  private _URL = "http://10.211.55.7:7777/";
  // private _proxyurl = "https://cors-anywhere.herokuapp.com/";
  constructor(private _httpClient : HttpClient) {


  }

  getQuotes() : Observable<Quote[]>{
    return this._httpClient.get<Quote[]>('http://10.211.55.7:7777/api/quote') ;
  }

  public fetchData() {
    return this._httpClient.get(this._URL+'/api/quote', {headers: new HttpHeaders({'Authorization': 'Bearer '+localStorage.getItem('userToken')})});
    // return this._httpClient.get(this._proxyurl+this._URL);
  }
  // getQuoteById(id : number) : Quote{
  //   return this.
  // } 


  public userAuthentication(_username, _password){
    var data = "username="+_username+"&password="+_password+"&grant_type=password";
    var reqHeader = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this._httpClient.post(this._URL+'token',data,{headers: reqHeader})
  }

  public userRegistration(_user : RegisterModel){
    console.log("username:  " + _user.username);
    console.log("email:  " + _user.email);
    console.log("password:  " + _user.password);
    console.log("confirmpassword:  " + _user.confirmpassword);


    

    var data = "username="+_user.username+"&email="+_user.email+"&password="+_user.password+"&confirmpassword="+_user.confirmpassword;
    var reqHeader = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

    // const body: RegisterModel = {
    //   username : _user.username,
    //   password : _user.password,
    //   password : _user.password
    // }
    return this._httpClient.post('http://10.211.55.7:7777/api/account/register', data,{headers: reqHeader});

    // return this._httpClient.post(this._URL+'api/account/register',_user);
  }
}
