import { Block } from '../../../utils';
import { ChatBarAvatar } from '../chatAvatar';

interface ChatItemProps {
	className: Array<string>;
	chatData: any;
	events?: {
		click: () => void;
	}
}

export class ChatItem extends Block {
  constructor(props: ChatItemProps) {
    super('div', props);
  }

  init() {
    this.props.className.forEach((element: string) => this.element!.classList.add(element));

    this.children.ChatAvatar = new ChatBarAvatar({ className: ['chat-avatar', this.props.chatData.color], src: this.props.chatData.image });
  }

  render() {
    return `  
      <div class="chat-item__left">
        {{{ChatAvatar}}}
        <div class="chat-item__column" style="margin-left: 18px">
          <div class="chat-item__name">${this.props.chatData.name}</div>
          <div class="chat-item__message">${this.props.chatData.lastMessage}</div>
        </div>
      </div>
      <div class="chat-item__column chat-item__right">
        <div class="chat-item__time">${this.props.chatData.timeOrDate}</div>
        {{#if ${this.props.chatData.countUnreadMessages}}}
          <div class="chat-item__unread">${this.props.chatData.countUnreadMessages}</div>
        {{/if}}
      </div>`;
  }
}
