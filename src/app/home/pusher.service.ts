import { Injectable } from '@angular/core';
import * as Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  channel: any;

  constructor() {
    const pusher = new Pusher('<api-key>', {
      cluster: 'eu',
      encrypted: true
    });
    this.channel = pusher.subscribe('chat');
  }

  public init() {
    return this.channel;
  }
}
