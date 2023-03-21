import { Block } from '../../../utils';
import { ChatBarAvatar } from '../chatAvatar';
import { Link } from '../../link';
import { Input } from '../../input';
interface ChatBarProps {
  className: Array<string>;
  events?: {
    click: () => void;
  }
}

export class ChatBar extends Block {
  constructor(props: ChatBarProps) {
    super('div', props);
  }

  init() {
    this.props.className.forEach((element: string) => this.element!.classList.add(element));

    this.children.ChatAvatar = new ChatBarAvatar({ className: ['chat-avatar'], src: this.props.user.avatar });
    this.children.UserName = new Link({
      className: ['chat-bar__profile-title'],
      label: this.props.user.first_name,
      nameRoute: 'profile',
      arrow: true,
    });
    this.children.Link = new Link({
      className: ['link'],
      label: 'Профиль',
      nameRoute: 'profile',
      arrow: true,
    });

    this.children.Input = new Input({
      className: ['input-field'], type: 'search', name: 'search', placeholder: 'Поиск по чатам...',
    });
  }

  render() {
    return `
    <div class="chat-bar__profile">
			<div class="chat-bar__profile-inner">
        {{{ChatAvatar}}}
        <div class="chat-bar__profile-title">{{{UserName}}}</div>
			</div>
			{{{ Link}}}
		</div>
		{{{Input}}}
		`;
  }
}

