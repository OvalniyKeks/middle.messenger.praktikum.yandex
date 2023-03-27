import { Block } from '../../../utils';
interface ChatBarAvatarProps {
	className: Array<string>;
  src: string;
  name?: string
}

export class ChatBarAvatar extends Block {
  image: string | null;
  constructor(props: ChatBarAvatarProps) {
    super('div', props);
  }

  init() {
    this.props.className.forEach((element: string) => this.element!.classList.add(element));

    this.image = null
    if (this.props.src) {
      this.image = `https://ya-praktikum.tech/api/v2/resources/${this.props.src}`
    }
  }

  getFirstLetter() {
    if (!this.props.name) return ''
    return this.props.name[0]
  }

  render() {
    return `
    <div class="chat-avatar" style="background-image: url(${this.image});">
      {{#if ${!this.image}}}
        <div class="chat-avatar__letter">${this.getFirstLetter()}</div>
      {{/if}}
    </div>
    `;
  }
}
