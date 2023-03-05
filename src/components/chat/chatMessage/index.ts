import { Block } from '../../../utils';
import { Input } from '../../input';
import { Button } from '../../button';
import { ChatBarAvatar } from '../chatAvatar';

interface chat {
	_id: string,
	image: string,
	name: string,
	lastMessage: string,
	timeOrDate: string,
	countUnreadMessages: number,
	selected: boolean
}

interface ChatMessageProps {
	className: Array<string>;
	currentChat: chat | string;
}

export class ChatMessage extends Block {
  constructor(props: ChatMessageProps) {
    super('div', props);
  }

  init() {
    this.props.className.forEach((element: string) => this.element!.classList.add(element));

	this.children.ChatAvatar = new ChatBarAvatar({ className: ['chat-avatar'], src: this.props.currentChat.image });

    this.children.InputFIle = new Input({ className: ['chat-message__input-file'], type: 'file', name: 'file', id: 'file' });
    this.children.InputMessage = new Input({ className: ['input-field', 'chat-message__input-text'], type: 'text', name: 'message', placeholder: 'Введите сообщение' });
    this.children.ButtonSend = new Button({ className: ['chat-message__input-send'], type: 'submit', name: 'send', label: 'Отправить' });
  }

  render() {
    if (typeof this.props.currentChat === 'string') {
      return `${this.props.currentChat}`;
    }
    return `
      <div class="chat-message__header">
		  	<div class="chat-bar__profile-inner">
		 		{{{ChatAvatar}}}
		  		<div class="chat-bar__profile-title">${this.props.currentChat.name}</div>
			</div>
    	  <div class="chat-message__menu">
    	    ...
    	  </div>
    	</div>
		
    	<div class="chat-message__window">
    	  <div class="chat-message__date">19 июля</div>
    	  <div class="chat-message__item-wrapper">
			<div class="chat-message__item another">
			  <div class="chat-message__item-content">another message dwadwadawdawdawdd</div>
			  <div class="chat-message__item-time">12:38</div>
			</div>
		  </div>
    	  <div class="chat-message__item-wrapper">
			<div class="chat-message__item my">
			  <div class="chat-message__item-content">This is my message</div>
			  <div class="chat-message__item-time">15:42</div>
			</div>
		  </div>
    	  <div class="chat-message__item-wrapper">
			<div class="chat-message__item my">
			  <div class="chat-message__item-content">This is my message</div>
			  <div class="chat-message__item-time">15:42</div>
			</div>
		  </div>
    	  <div class="chat-message__item-wrapper">
			<div class="chat-message__item my">
			  <div class="chat-message__item-content">This is my message</div>
			  <div class="chat-message__item-time">15:42</div>
			</div>
		  </div>
    	  <div class="chat-message__item-wrapper">
			<div class="chat-message__item my">
			  <div class="chat-message__item-content">This is my message</div>
			  <div class="chat-message__item-time">15:42</div>
			</div>
		  </div>
		  <div class="chat-message__item-wrapper">
			<div class="chat-message__item another">
			  <div class="chat-message__item-content">another message dwadwadawdawdawdd</div>
			  <div class="chat-message__item-time">12:38</div>
			</div>
		  </div>
    	</div>
		
    	<div class="chat-message__action">
    	  <label for="file" class="chat-message__input-file_label">📁{{{InputFIle}}}</label>
    	  {{{InputMessage}}}
    	  {{{ButtonSend}}}
    	</div>`;
  }
}
