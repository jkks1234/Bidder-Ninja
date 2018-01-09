import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import { Router} from '@angular/router';
import { product1} from './model';

import { Params, ActivatedRoute } from '@angular/router';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-listone',
  templateUrl: './listone.component.html',
  styleUrls: ['./listone.component.css']
})
export class ListoneComponent implements OnInit {
  product1:product1;
  pd:any;
  price: number = 0.0;
  socket = null;
  bidValue = '';
  id1:string;
  price3:number;
  n1:string;
  who:string;
  who1:string;
  constructor(private authService:AuthService,private route:ActivatedRoute,private router : Router) { }

  ngOnInit() {
   let id =this.route.snapshot.params['id'];
    console.log(id);
    this.authService.who()
        .subscribe(who =>{ 
          this.who=who;
          console.log(who);

        },);
    this.authService.getData1(id)
        .subscribe(product1 =>{
        
          this.product1=product1;

          console.log(product1);

        },);
          this.socket = io('http://localhost:3200');
        this.socket.on('priceUpdate', function(data){
            console.log('here3');

            this.price = this.product1.currentprice;
            this.who1 = this.product1.soldto;
               console.log(this.product1.soldto);

            if(this.price==0)
            {
              this.price=this.product1.currentprice;

            }
        }.bind(this));
        this.socket.on('priceUpdate2', function(data){
            console.log('here3');

            this.price = data;
            this.who1 =this.product1.soldto;
            console.log(this.product1.soldto);
            if(this.price==0)
            {
              this.price=this.product1.currentprice;

            }
        }.bind(this));

  }
        

   bid(){
         
         let pro2={
          id1:this.product1.id,
          price3:this.bidValue
         }

        if(parseInt(this.bidValue)>this.product1.currentprice)
        {
          this.authService.updateprice(pro2)
          .subscribe(pd =>
          {
              if(pd.success==false && pd.available==true)
              {
                window.location.reload();
              }
              else if(pd.success==false && pd.available==false)
              {
                   this.router.navigate(['/showitems']);
              }
              else{
                this.product1.currentprice=parseInt(pd.price);
                this.product1.soldto=pd.soldto;
              }

          console.log(pd);

        },);
        this.socket.emit('bid', this.bidValue);
                this.bidValue = '';
                 
              }
         }
         c1()
         {
          if(this.product1.soldto!=undefined)
          {
            return true;
          }
         }
         check()
         {
            if(this.product1.available=='true' && this.authService.loggedIn() && this.who!=this.product1.owneremail)
            {
              return true;
            }
            else
            {
              return false;
            }
         }
         check1()
         {
            if(this.product1.available=='false')
            {
              return true;
            }
            else
            {
              return false;
            }
         }
    }

