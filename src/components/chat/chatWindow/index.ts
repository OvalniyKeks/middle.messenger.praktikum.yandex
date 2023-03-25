import { Block } from '../../../utils';
import { Input } from '../../input';
import { Button } from '../../button';
import { ChatBarAvatar } from '../chatAvatar';
import { withStore } from '../../../utils/Store';
import { UserListComponent } from './ChatListUser';
import MessagesController from '../../../controllers/MessagesController';

interface ChatMessageProps {
	className: Array<string>;
	text?: string;
}

class ChatMessageComponent extends Block {
	messagesList: any;
	constructor(props: ChatMessageProps) {
		super('div', props);
	}

	init() {
		this.props.className.forEach((element: string) => this.element!.classList.add(element));

		this.children.InputFIle = new Input({
			className: ['chat-message__input-file'], type: 'file', name: 'file', id: 'file',
		});
		this.children.InputMessage = new Input({
			className: ['input-field', 'chat-message__input-text'], type: 'text', name: 'message', placeholder: 'Введите сообщение', id: 'message'
		});
		this.children.ButtonSend = new Button({
			className: ['chat-message__input-send'], type: 'submit', name: 'send', label: 'Отправить',
			events: {
				click: () => {
					const valueMessage = (document.getElementById('message') as HTMLInputElement).value
					if (!valueMessage) {
						return false
					}

					// MessagesController.sendMessage(this.props.chat.id, valueMessage)
					console.log(this.props.messages)
				}
			}
		});

		// if (this.props.message && this.props.message.hasOwnProperty(`${this.props.selectedChatId}`)) {
		// 	console.log('wadawdawd')
		// }

		// this.messagesList = this.props.message[this.props.selectedChatId]

		this.children.UserListComponent = new UserListComponent({
			className: ['chat-info']
		})
	}

	// @ts-ignore
  protected componentDidUpdate(oldProps: ChatProps, newProps: ChatProps): boolean {
    if (newProps.selectedChatId) {
			return true
		}

    return false;
  }

	render() {
		return `
		{{#if selectedChatId}}
      <div class="flex chat-window">
				<div class="chat-message__header">
					<div class="chat-bar__profile-inner">
						<div class="chat-bar__profile-title">${this.props.chat ? this.props.chat.title : ''}</div>
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
			{{else}}
				<div class="chat-message__window-nochat">Выберите чат</div>
			{{/if}}
			`;
	}
}


export const ChatMessage = withStore((state) => {
	return {chats: state.chats, users: state.users, messages: state.messages, chat: state.chat, selectedChatId: state.selectedChatId}
	// @ts-ignore
})(ChatMessageComponent);
