import ChatController from '../../../controllers/ChatController';
import { Block } from '../../../utils';
import { Button } from '../../button';

interface ChatUserProps {
  className: Array<string>;
  user?: any;
  chatId?: any;
}

export class ChatUser extends Block {
  constructor(props: ChatUserProps) {
    super('div', props);
  }

  init() {
    this.props.className.forEach((element: string) => this.element!.classList.add(element));

    this.children.deleteUser = new Button({
      className: ['button', 'chat-user__delete'],
      label: 'Удалить',
      name: 'add',
      type: 'button',
      events: {
        click: () => {
          // @ts-ignore
          ChatController.deleteUser(this.props.user.id, this.props.chatId)
        }
      }
    })
  }

  render() {
    return `
    <div class="chat-user__info">
      <div class="chat-user__name">${this.props.user.display_name}</div>
      <div class="chat-user__role">роль: ${this.props.user.role}</div>
    </div>
    {{{deleteUser}}}
    `;
  }
}
