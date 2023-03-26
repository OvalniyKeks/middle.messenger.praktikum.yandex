import { Block } from '../../../utils';
import { Input } from '../../input';
import { Button } from '../../button';
import { withStore } from '../../../utils/Store';
import { UserListComponent } from './ChatListUser';
import MessagesController from '../../../controllers/MessagesController';
import { deepCopy } from '../../../utils/helpers';
import { ChatMessage } from '../chatMessage';

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
			className: ['button', 'chat-message__input-send'], type: 'submit', name: 'send', label: 'Отправить',
			events: {
				click: () => {
					let inputMessage = (document.getElementById('message') as HTMLInputElement)
					const valueMessage = inputMessage.value
					if (!valueMessage) {
						return false
					}

					MessagesController.sendMessage(this.props.chat.id, valueMessage)

					// this.getMessages()

					inputMessage.value = ''
				}
			}
		});

		const messages = this.getMessages()
		if (messages) {
			this.children.messages = messages
		}

		this.children.UserListComponent = new UserListComponent({
			className: ['chat-info']
		})
	}

	// @ts-ignore
	protected componentDidUpdate(oldProps: ChatProps, newProps: ChatProps): boolean {
		if (newProps.messages) {
			this.children.messages = this.getMessages()
			return true
		}

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
					{{#if messages}}
						{{#each messages}}
							{{{ this }}}
						{{/each}}
					{{/if}}
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


	private getMessages() {
		let messages = deepCopy(this.props.messages, [])
		
		// console.log(messages)

		if (Object.keys(messages).length > 0) {
			messages = messages[this.props.selectedChatId]
		}

		if (messages.length > 0) {
			messages.reverse()
		}

		console.log(messages)

		return messages.map((message: any) => {
			if (message.type !== 'user connected') {
				return new ChatMessage({
					message: message,
					userId: this.props.user?.id
				});
			}
		})
	}
}


export const ChatMessenger = withStore((state) => {
	return { chats: state.chats, users: state.users, messages: state.messages, chat: state.chat, selectedChatId: state.selectedChatId, user: state.user }
	// @ts-ignore
})(ChatMessageComponent);
