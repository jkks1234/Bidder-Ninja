import { Injectable , OnInit } from '@angular/core';
import {Http , Headers , Response} from '@angular/http';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Rx';
import {tokenNotExpired} from 'angular2-jwt';
import * as io from 'socket.io-client';

@Injectable()
export class ChatService {
socket=null;
  constructor() { }
  sendMessage(message,username){
  let data={
    "message":message,
    "username":username
  };
  
    this.socket.emit('input',data);   
  }
}
