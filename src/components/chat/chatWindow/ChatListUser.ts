import { User } from '../../../api/AuthApi';
import ChatsController from '../../../controllers/ChatController';
import { UserToChat } from '../../../types';
import { Block } from '../../../utils';
import { deepCopy } from '../../../utils/helpers';
import { withStore } from '../../../utils/Store';
import { Button } from '../../button';
import { Input } from '../../input';
import { ChatUser } from './ChatUser';
interface ChatListUserProps {
  className: Array<string>;
  users: UserToChat[]
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
          let title: string = (document.getElementById('addUserToChat') as HTMLInputElement).value
          ChatsController.addUser(title, this.props.chatId)
        }
      }
    })
    this.children.selectUser = this.getUsers()

    this.children.nameChat = new Input({
      className: ['input-field'], type: 'text', name: 'nameUser', placeholder: 'Логин пользователя', id: 'addUserToChat'
    });
  }

  render() {
    return `
    {{#if isLoading}}
      <div class="chat-user__loading">Загрузка...</div>
    {{else if users}}
      <div class="chat-user__title">Участники</div>
      <div class="chat-user__inner">
        {{#each selectUser}}
          {{{this}}}
        {{/each}}
      
      {{#if ${this.roleUser()}}}
        <div style="margin-bottom: 40px"></div>
        {{{nameChat}}}
        {{{addChats}}}
      {{/if}}
      </div>
    {{else}}
      {{{nameChat}}}
      {{{addChats}}}
    {{/if}}
		`;
  }

  protected componentDidUpdate(oldProps: ChatListUserProps, newProps: ChatListUserProps): boolean {    
    if (newProps.users) {
      this.children.selectUser = this.getUsers()
      return true;
    }
    return false;
  }

  private roleUser() {
    if (!this.props.users) {
      return false
    }

    const users = deepCopy(this.props.users, [])

    const user = users.find((item: User) => item.id === this.props.user.id)
    return user?.role === 'admin'
  }

  private getUsers() {
    const users = deepCopy(this.props.users, [])

    return users.map((item: User) => {
      return new ChatUser({
        user: item,
        chatId: this.props.chatId,
        className: ["chat-user"]
      });
    })
  }
}


export const UserListComponent = withStore((state) => {
  return { users: state.users?.list, user: state.user, isLoading: state.users?.isLoading, chatId: state.selectedChatId }
})(ChatListUser as any);
