import { Block, ChatsFn } from '../../utils';
import { ChatBar } from '../../components/chat/chatBar';
import { ChatMessage } from '../../components/chat/ChatMessage';

interface ChatProps {
	className: string;
	isOpenChat?: boolean
}

export class Chat extends Block {
  constructor(props: ChatProps) {
    super('main', props);
  }

  init() {
    this.children.ChatBar = new ChatBar({
      className: ['chat-bar'],
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
    return `<div class="chat">{{{ChatBar}}} {{{ChatMessage}}}</div>`;
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
