import { Block } from '../../../utils';

interface ChatBarAvatarProps {
	className: Array<string>;
    src: string;
}

export class ChatBarAvatar extends Block {
  constructor(props: ChatBarAvatarProps) {
    super('div', props);
  }

  init() {
    this.props.className.forEach((element: string) => this.element!.classList.add(element));
  }

  render() {
    return `<div class="chat-avatar" style="background-image: url(https://ya-praktikum.tech/api/v2/resources/${this.props.src})"></div>`;
  }
}
