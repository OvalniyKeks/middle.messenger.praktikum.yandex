import { Block } from '../../../utils';
import { withStore } from '../../../utils/Store';
import { Button } from '../../button';

interface ChatBarAvatarProps {
  className: Array<string>;
  id: string,
  events?: {
    submit: (event: SubmitEvent) => void;
  }
}

export class AvatarEditComponent extends Block {
  constructor(props: ChatBarAvatarProps) {
    super('form', props);
  }

  init() {
    this.props.className.forEach((element: string) => this.element!.classList.add(element));

    this.element!.setAttribute("enctype", "multipart/form-data");

    this.children.uploadAvatar = new Button({
      className: ['button'],
      label: 'Обновить фото',
      name: 'submit',
      type: 'submit'
    })
  }

  render() {
    return `
    <label for="avatar" class="chat-avatar chat-avatar__edit" style="background-image: url(https://ya-praktikum.tech/api/v2/resources/${this.props.user.avatar}); margin-bottom: 20px">
      <input type='file' name='avatar' id='avatar'/>
    </label>
    {{{uploadAvatar}}}
    `;
  }
}


export const AvatarEdit = withStore((state) => {
	return { user: state.user }
})(AvatarEditComponent as any)
