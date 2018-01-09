import { Injectable } from '@angular/core'
import {Http , Headers , Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import {product} from '../components/showitems/model';
import {product1} from '../components/listone/model';
import {myproduct} from '../components/myproducts/model';


@Injectable()
export class AuthService {
	user:any;
    Post:any;
    authToken: any;
    product2:any;

  constructor(private http:Http) { }

addUser(user){
  	let headers = new Headers();
  	headers.append('Content-Type','application/json');
  	return this.http.post('http://localhost:3200/user/signup',user,{headers:headers}).map(res => res.json());
  }
  authenticateUser(user){
    let headers = new Headers(); 
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3200/user/login',user , {headers: headers}).map(res => res.json());
  }
addproduct(product){
	let headers = new Headers(); 
      this.loadToken();
      const modToken = this.authToken;
      console.log('token=');
      console.log(modToken);

      headers.append('Authorization',modToken);
	headers.append('Content-Type','application/json');
	return this.http.post('http://localhost:3200/user/additem',product,{
	headers:headers}).map(res=>res.json());
}
updateprice(product2){
  let headers = new Headers(); 
      this.loadToken();
      const modToken = this.authToken;
      console.log('token=');
      console.log(modToken);
      console.log(product2);
      headers.append('Authorization',modToken);
  headers.append('Content-Type','application/json');
  return this.http.post('http://localhost:3200/user/up',product2,{
  headers:headers}).map(res=>res.json());
}
getData():Observable<product[]> {
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.get('http://localhost:3200/user/showall',{headers:headers})
            .map(res => res.json())
            
    }
getData1(id:string):Observable<product1> {
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.get('http://localhost:3200/user/listone/'+id,{headers:headers})
            .map(res => res.json())
            
    }
getData2():Observable<myproduct[]> {
      let headers = new Headers(); 
      this.loadToken();
      const modToken = this.authToken;
      console.log('token=');
      console.log(modToken);
      headers.append('Authorization',modToken);
        headers.append('Content-Type','application/json');
        return this.http.get('http://localhost:3200/user/myproducts',{headers:headers})
            .map(res => res.json())
            
    }
    getData3():Observable<myproduct[]> {
      let headers = new Headers(); 
      this.loadToken();
      const modToken = this.authToken;
      console.log('token=');
      console.log(modToken);
      headers.append('Authorization',modToken);
        headers.append('Content-Type','application/json');
        return this.http.get('http://localhost:3200/user/soldproducts',{headers:headers})
            .map(res => res.json())
            
    }
     getData4():Observable<myproduct[]> {
      let headers = new Headers(); 
      this.loadToken();
      const modToken = this.authToken;
      console.log('token=');
      console.log(modToken);
      headers.append('Authorization',modToken);
        headers.append('Content-Type','application/json');
        return this.http.get('http://localhost:3200/user/mypurchased',{headers:headers})
            .map(res => res.json())
            
    }
delete(id:string){
    let headers = new Headers(); 
      this.loadToken();
      const modToken = this.authToken;
      console.log('token=');
      console.log(modToken);
      headers.append('Authorization',modToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3200/user/delete/'+id,{headers:headers}).map(res => res.json());
  }
  change(id:string){
    let headers = new Headers(); 
      this.loadToken();
      const modToken = this.authToken;
      console.log('token=');
      console.log(modToken);
      headers.append('Authorization',modToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3200/user/change/'+id,{headers:headers}).map(res => res.json());
  }
  who()
  {
  let headers = new Headers(); 
      this.loadToken();
      const modToken = this.authToken;
      console.log('token=');
      console.log(modToken);
      headers.append('Authorization',modToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3200/user/who',{headers:headers}).map(res => res.json());

  }
storeUserData(token , user){
    localStorage.setItem('id_token'  , token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
    console.log(user);
  }
  
  loadToken(){
    const token = localStorage.getItem('id_token');
    console.log(token);
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
