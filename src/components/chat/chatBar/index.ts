import { Block, ChatsFn } from '../../../utils';
import { ChatBarAvatar } from '../chatAvatar';
import { ChatItem } from '../chatItem';
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

    this.children.ChatAvatar = new ChatBarAvatar({ className: ['chat-avatar'], src: 'https://i.ytimg.com/vi/eXwZMAz9Vh8/maxresdefault.jpg' });
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
				<div class="chat-bar__profile-title">Антон</div>
			  </div>
			  {{{ Link}}}
			</div>
			{{{Input}}}
		`;
  }
}
