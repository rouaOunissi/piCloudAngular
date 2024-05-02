import { Component, OnInit, inject } from '@angular/core';
import { GeminiService } from '../gemini.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})
export class ChatBotComponent  implements OnInit {
  receivedText: string='';

  chatHistory:any[]=[];
  prompt:string="";
  geminiService :GeminiService = inject (GeminiService);
  
  constructor(private route:ActivatedRoute){
    this.geminiService.getMessageHistory().subscribe((res)=>{
      if(res){
        this.chatHistory.push(res);
      }
    })
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.receivedText = params['text'];
    });
    if(this.receivedText!= ''){
      this.prompt=this.receivedText;
    }
  }
  
  sendData(){
    if(this.prompt){
  this.geminiService.generateText(this.prompt);
  this.prompt="";
    }
  
  }
  formtText(text:string){
    const result= text.replaceAll('*','');
    return result;
  }
   
  
  }