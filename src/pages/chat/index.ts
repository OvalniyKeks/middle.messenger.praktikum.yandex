import { Block, ChatsFn } from '../../utils';
import { ChatBar } from '../../components/chat/chatBar';
import { ChatList } from '../../components/chat/chatList';
import { ChatMessage } from '../../components/chat/chatMessage';

interface ChatProps {
	className: string;
	isOpenChat?: boolean
}

export class Chat extends Block {
  constructor(props: ChatProps) {
    super('main', props);
  }

  init() {
    this.children.ChatBar = new ChatBar({className: ['chat-bar__top'],});
    this.children.ChatList = new ChatList({
      className: ['chat-bar__items'],
      events: {
        click: () => {
          this.setProps(
            // @ts-ignore
            this.props.isOpenChat = true,
          );
        },
      },
    });

    this.children.ChatMessage = this.getComponentChat();
  }

  render() {
    return `<div class="chat">
			<div class="chat-bar">
				{{{ChatBar}}}
				{{{ChatList}}}
			</div>
			{{{ChatMessage}}}</div>`;
  }

  getComponentChat() {
    if (ChatsFn.currentChat) {
      return new ChatMessage({
        className: ['chat-message', 'flex', 'flex-center'],
        currentChat: ChatsFn.currentChat,
      });
    }
    return new ChatMessage({
      className: ['chat-message', 'flex', 'flex-center'],
      currentChat: 'Выберите чат',
    });
  }

  // // @ts-ignore
  protected componentDidUpdate(oldProps: ChatProps, newProps: ChatProps): boolean {
    this.children.ChatMessage = this.getComponentChat();

    return true;
  }
}
