import { Component, OnInit, OnDestroy  } from '@angular/core';
import { WebSocketService } from 'src/app/modules/front-office/services/projetService/webSocket/web-socket.service';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent  {
  

  constructor(private notificationService: WebSocketService) {
   

  
}}
