import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import { Router} from '@angular/router';
import { myproduct} from '../myproducts/model';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-soldproducts',
  templateUrl: './soldproducts.component.html',
  styleUrls: ['./soldproducts.component.css']
})
export class SoldproductsComponent implements OnInit {
myproduct:myproduct[];
  constructor(private authService:AuthService,
  			  private router : Router) { }

  ngOnInit() {
  this.authService.getData3()
        .subscribe(myproduct =>{
        	
        	this.myproduct=myproduct;
        	console.log(myproduct);

        },);
  }

}
