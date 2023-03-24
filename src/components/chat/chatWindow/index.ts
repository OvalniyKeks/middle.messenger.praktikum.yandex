import { Block } from '../../../utils';
import { Input } from '../../input';
import { Button } from '../../button';
import { ChatBarAvatar } from '../chatAvatar';
import { withStore } from '../../../utils/Store';
import { ChatListUser } from './ChatListUser';

interface ChatMessageProps {
	className: Array<string>;
	text?: string;
}

class ChatMessageComponent extends Block {
	constructor(props: ChatMessageProps) {
		super('div', props);
	}

	init() {
		this.props.className.forEach((element: string) => this.element!.classList.add(element));

		this.children.ChatAvatar = new ChatBarAvatar({ className: ['chat-avatar'], src: this.props });

		this.children.InputFIle = new Input({
			className: ['chat-message__input-file'], type: 'file', name: 'file', id: 'file',
		});
		this.children.InputMessage = new Input({
			className: ['input-field', 'chat-message__input-text'], type: 'text', name: 'message', placeholder: 'Введите сообщение',
		});
		this.children.ButtonSend = new Button({
			className: ['chat-message__input-send'], type: 'submit', name: 'send', label: 'Отправить',
		});

		this.children.UserListComponent = new UserListComponent({
			className: ['chat-info']
		})
	}

	render() {
		if (typeof this.props.text === 'string') {
			return `${this.props.text}`;
		}
		return `
      <div class="flex chat-window">
				<div class="chat-message__header">
					<div class="chat-bar__profile-inner">
						{{{ChatAvatar}}}
						<div class="chat-bar__profile-title">${this.props}</div>
					</div>
				</div>
			
				<div class="chat-message__window">
					<div class="chat-message__date">19 июля</div>
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
				</div>
			</div>
			{{{UserListComponent}}}
			`;
	}
}


export const ChatMessage = withStore((state) => {
	return {chats: state.chats, users: state.users}
	// @ts-ignore
})(ChatMessageComponent);


export const UserListComponent = withStore((state) => {
  return { users: state.users?.list, isLoading: state.users?.isLoading, chatId: state.selectedChatId }
  // @ts-ignore
})(ChatListUser);
