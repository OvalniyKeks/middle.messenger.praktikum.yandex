import { Block, ChatsFn } from '../../../utils';
import { ChatItem } from '../chatItem';

interface ChatListProps {
	className: Array<string>;
	events?: {
		click: () => void;
	}
}

export class ChatList extends Block {
  constructor(props: ChatListProps) {
    super('div', props);
  }

  init() {
    this.props.className.forEach((element: string) => this.element!.classList.add(element));

    this.children.chats = this._getChats();
  }

  render() {
    return `
    {{#each chats}}
				{{{ this }}}
			{{/each}}
	  `;
  }

  _getChats() {
    const chats = ChatsFn.getChats();

    return chats.map((chat: { _id: any; }) => new ChatItem({
      className: ['chat-item'],
      chatData: chat,
      events: {
        click: () => {
          ChatsFn.changeChat(chat._id);
        },
      },
    }));
  }
}