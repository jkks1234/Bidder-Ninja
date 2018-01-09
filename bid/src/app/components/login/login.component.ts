import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	email:string;
	password:string;
  constructor(private authService:AuthService,
  			  private router : Router) { }

  ngOnInit() {
  if(this.authService.loggedIn())
  {
      this.router.navigate(['/showitems']);
  }
  }
  onSubmit(){
  	 const user ={
      
      email:this.email,
      password:this.password,
    }
  if(this.email==undefined || this.password==undefined )
    {
        this.router.navigate(['/signup']);
            console.log("User not registered!");
    }
  else
    {
        this.authService.authenticateUser(user).subscribe(data => {
         console.log('data');
          if(data.success){
                // console.log("Login Successfull !");
                this.authService.storeUserData(data.token , data.user);
                this.router.navigate(['/showitems']);
                }
          else{
          
                this.router.navigate(['/login']);
             console.log("User not registered !");
           
          }
        });
   }
 }

}
