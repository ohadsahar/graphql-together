import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class WebSocketService {

  private socket = io('http://localhost:3001');

  listen(eventName: string) {
    return new Observable<{message: any}>((response) => {
      this.socket.on(eventName, (data) => {
        response.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
