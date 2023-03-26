import { Block } from '../../utils';
import { ChatBar } from '../../components/chat/chatBar';
import { ChatsList } from '../../components/chat/chatsList';
import { ChatMessenger } from '../../components/chat/chatWindow';
import store, { withStore } from '../../utils/Store';
import ChatController from '../../controllers/ChatController';

interface ChatProps {
  className: string;
  isOpenChat?: boolean
}

export class Chat extends Block {
  constructor(props: ChatProps) {
    super('main', props);
  }

  init() {
    ChatController.fetchChats()

    this.children.ChatBar = new ChatBarComponent({ className: ['chat-bar__top'] });
    this.children.ChatList = new ChatsListComponent({
      className: ['chat-bar__items']
    });

    // this.children.ChatMessage = this.getComponentChat();
    this.children.ChatMessenger = new ChatMessenger({
      className: ['chat-message'],
    });
  }

  render() {
    return `
    <div class="chat">
			<div class="chat-bar">
				{{{ChatBar}}}
				{{{ChatList}}}
			</div>
			{{{ChatMessenger}}}
    </div>`;
  }
}

export const ChatBarComponent = withStore((state) => {
  return { user: state.user }

  // @ts-ignore
})(ChatBar);
export const ChatsListComponent = withStore((state) => {
  return { chats: state.chats?.list, isLoading: state.chats?.isLoading }

  // @ts-ignore
})(ChatsList);
