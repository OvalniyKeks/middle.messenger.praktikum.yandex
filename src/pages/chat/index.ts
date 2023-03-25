import { Block } from '../../utils';
import { ChatBar } from '../../components/chat/chatBar';
import { ChatsList } from '../../components/chat/chatsList';
import { ChatMessage } from '../../components/chat/chatWindow';
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
    this.children.ChatMessage = new ChatMessage({
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
			{{{ChatMessage}}}
    </div>`;
  }

  // getComponentChat() {
  //   if (store.getState().selectedChatId) {
  //     return new ChatMessage({
  //       className: ['chat-message'],
  //     });
  //   }
  //   return new ChatMessage({
  //     className: ['chat-message', 'flex', 'flex-center'],
  //     text: 'Выберите чат',
  //   });
  // }

  // @ts-ignore
  // protected componentDidUpdate(oldProps: ChatProps, newProps: ChatProps): boolean {
  //   this.children.ChatMessage = this.getComponentChat();

  //   return true;
  // }
}

// export const Chat = withStore((state) => {
//   return state

//   // @ts-ignore
// })(ChatPage);

export const ChatBarComponent = withStore((state) => {
  return { user: state.user }

  // @ts-ignore
})(ChatBar);
export const ChatsListComponent = withStore((state) => {
  return { chats: state.chats?.list, isLoading: state.chats?.isLoading }

  // @ts-ignore
})(ChatsList);
