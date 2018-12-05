import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { v4 } from 'uuid';
import { ChatService } from './chat.service';
import { PusherService } from './pusher.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  chatForm: FormGroup;
  messages: Array<Message> = [];
  lastMessageId;
  showEmojis = false;
  score = {
    tone: '',
    score: 0,
  };
  get text() {
    return this.chatForm.get('text').value;
  }
  constructor(private fb: FormBuilder,
    private alertCtrl: AlertController,
    private chat: ChatService,
    private pusher: PusherService) {
    this.createForm();
  }

  createForm() {
    this.chatForm = this.fb.group({
      id: [null],
      text: [null, Validators.required]
    });
  }

  ngOnInit() {
    const channel = this.pusher.init();
    channel.bind('message', (data) => {
      if (data.id !== this.lastMessageId) {
        const message: Message = {
          ...data,
          type: 'incoming'
        };
        this.showEmojis = true;
        this.score = data.sentiment;
        this.messages = this.messages.concat(message);
      }
    });

  }

  async sendMessage() {
    if (!this.chatForm.valid) {
      const alert = await this.alertCtrl.create({
        message: 'Enter a message please',
        buttons: ['ok']
      });

      await alert.present();
    } else {
      this.lastMessageId = v4();
      this.showEmojis = false;
      this.chatForm.patchValue({
        id: this.lastMessageId
      });
      // console.log(this.chatForm.value);
      this.chat.sendMessage(this.chatForm.value).subscribe((res: Message) => {
        const message = {
          ...res,
          // message type gets added to show difference between incoming and outgoing
          type: 'outgoing'
        };
        this.messages = this.messages.concat(message);
        this.chatForm.patchValue({
          text: ''
        });
      });
    }


  }

  selectEmoji(e) {
    const emoji = String.fromCodePoint(e);
    // this.message += ` ${emoji}`;
    this.chatForm.patchValue({
      text: `${this.text} ${emoji}`
    });
    this.showEmojis = false;
  }

  // This method adds classes to the element based on the message type
  getClasses(messageType) {
    return {
      incoming: messageType === 'incoming',
      outgoing: messageType === 'outgoing',
    };
  }

}

interface Message {
  id: string;
  text: string;
  timeStamp: Date;
  type: string;
}
