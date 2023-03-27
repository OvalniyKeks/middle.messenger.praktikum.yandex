import { Block, FormFn } from '../../../utils';
import { Input } from '../../input';
import { Button } from '../../button';
import { withStore } from '../../../utils/Store';
import { UserListComponent } from './ChatListUser';
import MessagesController from '../../../controllers/MessagesController';
import { deepCopy } from '../../../utils/helpers';
import { ChatMessage } from '../chatMessage';
import { Message } from '../../../types';
import { MessageForm } from '../../form/sendmessage';

interface ChatMessageProps {
	className: Array<string>;
	messages: Message[],
	selectedChatId: number;
	text?: string;
}

class ChatMessageComponent extends Block {
	messagesList: Array<Message>;
	constructor(props: ChatMessageProps) {
		super('div', props);
	}

	init() {
		this.props.className.forEach((element: string) => this.element!.classList.add(element));

		const messages = this.getMessages()
		if (messages) {
			this.children.messages = messages
		}

		this.children.UserListComponent = new UserListComponent({
			className: ['chat-info']
		})

		this.children.sendMessage = new MessageForm({
			className: ['chat-message__action'],
			name: 'sendmessage',
			events: {
				submit: (event) => {
					event!.preventDefault();

					const resultCheck = FormFn.checkForm('sendmessage');
					if (resultCheck) {
						this.sendMessage()
					}
				}
			}
		})
	}

	sendMessage() {
		let data: { [key: string]: any } = {}
    FormFn.getFields('sendmessage').map(input => {
			data[(input as HTMLInputElement).name] = (input as HTMLInputElement).value
		});

		MessagesController.sendMessage(this.props.chat.id, data.message)

		FormFn.resetForm('sendmessage')
	}

	protected componentDidUpdate(oldProps: ChatMessageProps, newProps: ChatMessageProps): boolean {
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
			
				{{{sendMessage}}}
			</div>
			{{{UserListComponent}}}
			{{else}}
				<div class="chat-message__window-nochat">Выберите чат</div>
			{{/if}}
			`;
	}


	private getMessages() {
		let messages = deepCopy(this.props.messages, [])
		if (Object.keys(messages).length > 0 && messages[this.props.selectedChatId]) {
			messages = messages[this.props.selectedChatId]
		} else {
			messages = []
		}

		if (Array.isArray(messages) && messages.length > 0) {
			messages.reverse()
		}

		return messages.map((message: Message) => {
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
})(ChatMessageComponent as any);
