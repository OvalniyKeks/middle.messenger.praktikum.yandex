// import { Block, ChatsFn } from '../../../utils';
// import { ChatMessage } from '../chatMessage';
// // import {ChatBarAvatar} from '../chatAvatar'
// // import {ChatListPerson} from "../chatListPerson";
// // import {CHATS} from "../../../../static/data/data";

// interface ChatViewProps {
// 	className: Array<string>;
// 	isChat: any;
// }

// export class ChatView extends Block {
// 	constructor(props: ChatViewProps) {
// 		super('div', props);
// 	}

// 	init() {
// 		this.props.className.forEach((element: string) => this.element!.classList.add(element));

// 		this.children.ChatMessage = new ChatMessage({ className: ["chat-message"], currentChat: ChatsFn.currentChat })
// 	}

// 	render() {
// 		return `
// 		{{#if ${!ChatsFn.currentChat}}}
// 			Выберите чат
// 		{{/if}}

// 		{{#if ${ChatsFn.currentChat}}}
// 			{{{ChatMessage}}}
// 		{{/if}}
// 		`;
// 	}

// 	//@ts-ignore
// 	protected componentDidUpdate(oldProps: ChatsFn.currentChat, newProps: ChatsFn.currentChat): boolean {
// 		console.log('awwadawdwa')
// 		this.children.ChatMessage = ChatMessage({ className: ["chat-message"], currentChat: ChatsFn.currentChat })

// 		return true;
// 	}
// }
