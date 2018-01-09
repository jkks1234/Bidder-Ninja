import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-postitem',
  templateUrl: './postitem.component.html',
  styleUrls: ['./postitem.component.css']
})
export class PostitemComponent implements OnInit {
	name:string;
	description:string;
	price:number;

  constructor(private authService:AuthService,
  			  private router : Router) { }

  ngOnInit() {
  }
  onSubmit(){
  const product={	
  		name:this.name,
  		description:this.description,
  		price:this.price
  	}

  if(this.name==undefined || this.description==undefined || this.price==undefined)
  {
    this.router.navigate(['/postitem']);
  }
  else
  {

  	this.authService.addproduct(product).subscribe(data => {
  	 
  		if(data){
  			console.log("product added!");
  			console.log(data);
        this.router.navigate(['/showitems']);
        
  		}
  		else{
  		   console.log("sorry");
         this.router.navigate(['/postitem']);
  		}
  	});
    }
  }

}
