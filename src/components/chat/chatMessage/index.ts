import { Message } from '../../../types';
import { Block } from '../../../utils';
import { formatDate } from '../../../utils/helpers';

interface ChatMessageProps {
  className?: Array<string>;
  message: Message,
  userId: number,
  events?: {
    click: () => void;
  }
}

export class ChatMessage extends Block {
  typeMessage: string;
  constructor(props: ChatMessageProps) {
    super('div', props);
  }

  init() {
    if (this.props.className && this.props.className.length > 0) {
      this.props.className.forEach((element: string) => this.element!.classList.add(element));
    }

    this.element!.classList.add('chat-message__item-wrapper')


    this.typeMessage = 'another'
    if (this.props.userId === this.props.message.user_id) {
      this.typeMessage = 'my'
    }
  }

  render() {
    return `  
    <div class="chat-message__item ${this.typeMessage}">
      <div class="chat-message__item-content">${this.props.message.content}</div>
      <div class="chat-message__item-time">${ formatDate(this.props.message.time)}</div>
    </div>
    `;
  }
}
