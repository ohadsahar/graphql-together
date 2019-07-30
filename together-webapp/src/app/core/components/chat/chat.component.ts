import { LobbyChatInterface } from './../../../shared/models/lobby-chat.model';
import { WebSocketService } from './../../services/web-socket.service';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ChatComponent implements OnInit {

  arrayMessages: LobbyChatInterface[];

  constructor(private webSocketService: WebSocketService) {
    this.arrayMessages = [];
  }

  ngOnInit() {
    this.startSocketing();
  }

  startSocketing() {
    this.webSocketService.listen('new-lobby-message').subscribe((messageData) => {
      this.arrayMessages.push({ username: 'ohad sahar', message: messageData.message })
    });

  }

  sendMessage(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.webSocketService.emit('send-lobby-message', form.value.message);
    form.reset();
  }
}
