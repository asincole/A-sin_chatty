import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { v4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // baseUrl = '<server-url>';
  baseUrl = 'https://pushercole.azurewebsites.net/api/';

  constructor(private http: HttpClient) { }

  sendMessage(message: any) {
    return this.http.post(`${this.baseUrl}Messages`, message);
  }
}

interface Data {
  id: any;
  text: string;
}
