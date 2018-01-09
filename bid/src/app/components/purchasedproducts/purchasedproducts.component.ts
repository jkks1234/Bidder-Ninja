import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import { Router} from '@angular/router';
import { product} from './model';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-purchasedproducts',
  templateUrl: './purchasedproducts.component.html',
  styleUrls: ['./purchasedproducts.component.css']
})
export class PurchasedproductsComponent implements OnInit {

  product:product[];
  constructor(private authService:AuthService,
  			  private router : Router) { }

  ngOnInit() {
  	this.authService.getData4()
        .subscribe(product =>{
        
        	this.product=product;
        	console.log(product);

        },);
  }

}
