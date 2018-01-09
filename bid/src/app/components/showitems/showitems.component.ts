import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import { Router} from '@angular/router';
import { product} from './model';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-showitems',
  templateUrl: './showitems.component.html',
  styleUrls: ['./showitems.component.css'],
})
export class ShowitemsComponent implements OnInit {
 product:product[];
  constructor(private authService:AuthService,
  			  private router : Router) { }

  ngOnInit() {
  	this.authService.getData()
        .subscribe(product =>{
        
        	this.product=product;
        	console.log(product);

        },);
  }

}
