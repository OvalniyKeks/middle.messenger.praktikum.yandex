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

    this.children.ChatAvatar = new ChatBarAvatar({ className: ['chat-avatar'], src: this.props.user.avatar, name: this.props.user.display_name ?? this.props.user.first_name });
    this.children.Link = new Link({
      className: ['link'],
      label: 'Профиль',
      nameRoute: 'profile',
      arrow: true,
    });
  }

  render() {
    return `
    <div class="chat-bar__profile">
			<div class="chat-bar__profile-inner">
        {{{ChatAvatar}}}
        <div class="chat-bar__profile-title">${this.props.user.display_name ?? this.props.user.first_name}</div>
			</div>
			{{{ Link}}}
		</div>
		`;
  }
}

