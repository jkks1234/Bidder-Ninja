import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
	name :String;
    email:String;
    password:String;
    ph:Number;
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
  		name:this.name,
  		email:this.email,
  		password:this.password,
  		phoneno:this.ph,
  	}
    
  if(this.name==undefined || this.email==undefined || this.password==undefined || this.ph ==undefined)
  {
        this.router.navigate(['/signup']);
            console.log("User not registered!");
  }
  else
  	{
        this.authService.addUser(user).subscribe(data => {
      		if(data.success){
          this.router.navigate(['/login']);
      			console.log("User registered!");
      			console.log(data);
      		}
          else if(!data.succes){
     
            this.router.navigate(['/signup']);
            console.log("User not registered!");
           
          }
      		else{
      		   console.log("User not registered !");
      		   this.router.navigate(['/signup']);
      		}
      	});

    }
  }
}
