import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: Socket | null = null;

  constructor() { }

  // Connect to WebSocket server
  connect(userId: string | undefined): void {
    this.socket = io('http://localhost:2000', {
      query: { userId }
    });

    // Reconnect on disconnect
    this.socket.on('disconnect', () => {
      setTimeout(() => {
        this.connect(userId);
      }, 1000);
    });
  }

  // Listen for messages from WebSocket server
  on(eventName: string): Observable<any> {
    return new Observable<any>(observer => {
      this.socket?.on(eventName, data => {
        observer.next(data);
      });
    });
  }

  // Emit WebSocket events
  emit(eventName: string, eventData: any): void {
    this.socket?.emit(eventName, eventData);
  }
}
