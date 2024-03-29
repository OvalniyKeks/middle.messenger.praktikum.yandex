import ChatController from '../../../controllers/ChatController';
import { Chat } from '../../../types';
import { Block } from '../../../utils';
import { Button } from '../../button';
import { ChatBarAvatar } from '../chatAvatar';

interface ChatItemProps {
	className: Array<string>;
	chatData: Chat;
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
    this.children.ChatAvatar = new ChatBarAvatar({ className: ['chat-avatar'], src: this.props.chatData.avatar, name: this.props.chatData.title });

    this.children.RemoveChat = new Button({label: 'Удалить', className: ['chat-user__delete'], events: {
      click: (e) => {
        e.stopPropagation()
        this.onRemoveChat()
      }
    }})
  }

  onRemoveChat () {
    ChatController.delete(this.props.chatData.id)
  }

  render() {
    return `  
      <div class="chat-item__left">
        {{{ChatAvatar}}}
        <div class="chat-item__column" style="margin-left: 18px">
          <div class="chat-item__name">
            ${this.props.chatData.title}
          </div>
          <div class="chat-item__message">${this.props.chatData.last_message ? this.props.chatData.last_message.content : ''}</div>
        </div>
      </div>
      <div class="chat-item__column chat-item__right">
        {{{RemoveChat}}}
        {{#if ${this.props.chatData.unread_count}}}
          <div class="chat-item__unread">${this.props.chatData.unread_count}</div>
        {{/if}}
      </div>`;
  }
}
