import { Block } from '../../../utils';
import { Button } from '../../button';
import { ChatItem } from '../chatItem';
import { Input } from '../../input';
import ChatsController from '../../../controllers/ChatController';
import { Chat } from '../../../types';

interface ChatListProps {
  className: Array<string>;
  chats: Chat[]
  events?: {
    click: () => void;
  }
}

export class ChatsList extends Block {
  constructor(props: ChatListProps) {
    super('div', props);
  }

  init() {
    this.props.className.forEach((element: string) => this.element!.classList.add(element));

    this.children.addChats = new Button({
      className: ['button'],
      label: 'Добавить чат',
      name: 'add',
      type: 'button',
      events: {
        click: () => {
          let title: string = (document.getElementById('addNameChat') as HTMLInputElement).value
          ChatsController.create(title)
        }
      }
    })

    this.children.nameChat = new Input({
      className: ['input-field'], type: 'text', name: 'nameChat', placeholder: 'Название чата', id: 'addNameChat'
    });
  }

  render() {
    return `
    {{#if isLoading}}
      Загрузка...
    {{else if chats}}
      {{#each chats}}
        {{{ this }}}
      {{/each}}
      <div style="padding: 0 10px; margin-top: 20px">
        {{{nameChat}}}
        {{{addChats}}}
      </div>
    {{else}}
      <div style="padding: 0 10px">
        {{{nameChat}}}
        {{{addChats}}}
      </div>
    {{/if}}
    `;
  }

  protected componentDidUpdate(newProps: ChatListProps): boolean {
    if (newProps.chats) {
      this.children.chats = this.createChats();
      return true;
    }
    return false;
  }

  private createChats() {
    return this.props.chats.map((chat: Chat) => {
      return new ChatItem({
        chatData: chat,
        className: ["chat-item"],
        events: {
          click: () => {
            ChatsController.selectChat(chat.id)
          }
        }
      });
    })
  }
}
