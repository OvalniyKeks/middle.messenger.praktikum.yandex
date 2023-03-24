import ChatController from '../../../controllers/ChatController';
import { Block } from '../../../utils';
import { Button } from '../../button';
import { Input } from '../../input';
interface ChatListUserProps {
  className: Array<string>;
  events?: {
    click: () => void;
  }
}

export class ChatListUser extends Block {
  constructor(props: ChatListUserProps) {
    super('div', props);
  }

  init() {
    this.props.className.forEach((element: string) => this.element!.classList.add(element));
    this.children.addChats = new Button({
      className: ['button'],
      label: 'Добавить',
      name: 'add',
      type: 'button',
      events: {
        click: () => {
          // @ts-ignore
          let title: any = document.getElementById('addUserToChat').value
          ChatController.addUser(title, this.props.chatId)
        }
      }
    })

    this.children.nameChat = new Input({
      className: ['input-field'], type: 'text', name: 'nameUser', placeholder: 'Логин пользователя', id: 'addUserToChat'
    });
  }

  render() {
    return `
    {{#if isLoading}}
      Загрузка...
    {{else if users}}
      <div class="chat-user__title">Участники</div>
      {{#each users}}
        <div class="chat-user">
          <div class="chat-user__info">
            <div class="chat-user__name">{{this.display_name}}</div>
            <div class="chat-user__role">роль: {{this.role}}</div>
          </div>
          <div class="chat-user__delete">Удалить</div>
        </div>
      {{/each}}
      {{{nameChat}}}
      {{{addChats}}}
    {{else}}
      {{{nameChat}}}
      {{{addChats}}}
    {{/if}}
		`;
  }
}
