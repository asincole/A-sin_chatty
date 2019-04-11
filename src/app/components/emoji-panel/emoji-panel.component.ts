import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-emoji-panel',
  templateUrl: './emoji-panel.component.html',
  styleUrls: ['./emoji-panel.component.scss']
})
export class EmojiPanelComponent implements OnInit {
  @Input() result: Result;
  @Input() showEmojis = false;
  @Output() EmojiSelect: EventEmitter<string> = new EventEmitter();
  emojiList = {
    positive: [128512, 128513, 128536, 128516],
    neutral: [128528, 128529, 128566, 129300],
    negative: [128543, 128577, 128546, 128542],
  };

  constructor() { }

  codePoint(emojiCodePoint) {
    return String.fromCodePoint(emojiCodePoint);
  }

  onClick(reaction, index) {
    const emoji = this.emojiList[reaction][index];
    this.EmojiSelect.emit(emoji);
  }

  ngOnInit() {
  }

}

interface Result {
  tone?: any;
}
