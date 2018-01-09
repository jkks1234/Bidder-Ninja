import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import { Router} from '@angular/router';
import { myproduct} from './model';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-myproducts',
  templateUrl: './myproducts.component.html',
  styleUrls: ['./myproducts.component.css']
})
export class MyproductsComponent implements OnInit {
myproduct:myproduct[];
response:any;
response1:any;
  constructor(private authService:AuthService,
  			  private router : Router) { }

  ngOnInit() {
  
    this.authService.getData2()
        .subscribe(myproduct =>{
        
        	this.myproduct=myproduct;
        	console.log(myproduct);

        },);
     };
     clicked(t)
     {
      console.log(t);
      this.authService.delete(t)
      .subscribe(response =>{
        console.log('hum yaha hai');
          this.response=response;
          console.log('hum yaha hai');
         window.location.reload();
        },);

     }
      clicked1(t)
     {
      console.log(t);
      this.authService.change(t)
      .subscribe(response1 =>{
        console.log('hum yaha hai');
          this.response1=response1;
          console.log('hum yaha hai');
         window.location.reload();
        },);

     }

}
