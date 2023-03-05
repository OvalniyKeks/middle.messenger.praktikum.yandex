import {Block} from '../../../utils/';
// import {ChatListPerson} from "../chatListPerson";
// import {CHATS} from "../../../../static/data/data";


interface ChatBarAvatarProps {
	className: Array<string>;
    src: string;
}

export class ChatBarAvatar extends Block {
	constructor(props: ChatBarAvatarProps) {
		super('div', props);
	}

	init() {
		this.props.className.forEach((element: string) => this.element!.classList.add(element));
	}

	render() {
		return `<div class="chat-avatar" style="background-image: url(${this.props.src})"></div>`;
	}
}