import { Block } from '../../../utils';
import { Button } from '../../button';
import { ChatItem } from '../chatItem';
import { Input } from '../../input';
import ChatController from '../../../controllers/ChatController';

interface ChatListProps {
  className: Array<string>;
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
          // @ts-ignore
          let title: any = document.getElementById('addNameChat').value
          ChatController.create(title)
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

  protected componentDidUpdate(oldProps: ChatListProps, newProps: ChatListProps): boolean {
    // @ts-ignore
    if (newProps.chats) {
      this.children.chats = this.createChats();
      return true;
    }
    return false;
  }

  private createChats() {
    return this.props.chats.map((data: {id: number}) => {
      return new ChatItem({
        chatData: data,
        className: ["chat-item"],
        events: {
          click: () => {
            ChatController.selectChat(data.id)
          }
        }
      });
    })
  }
}
