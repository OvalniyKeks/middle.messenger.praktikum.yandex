import { Block } from '../../utils';
import { Input } from '../input';
import { Button } from '../button';

interface EditProfileProps {
    className: Array<string>;
    name: string
    events?: {
        submit: (event: SubmitEvent) => void;
    }
}

export class FormEditProfilePassword extends Block {
  constructor(props: EditProfileProps) {
    super('form', props);
  }

  init() {
    this.props.className.forEach((element: string) => this.element!.classList.add(element));

        this.element!.setAttribute('data-id', this.props.name);
        this.children.InputOldPassword = new Input({
        	className: ['form-input'], type: 'password', name: 'oldPassword', placeholder: 'Старый пароль',
        });
        this.children.InputNewPassword = new Input({
        	className: ['form-input'], type: 'password', name: 'newPassword', placeholder: 'Новый пароль',
        });
        this.children.ButtonSubmit = new Button({
        	className: ['form-button'], type: 'submit', name: 'submit', label: 'Сохранить',
        });
  }

  render() {
    return `
        
        {{{InputOldPassword}}}
        {{{InputNewPassword}}}
        {{{ButtonSubmit}}}
        `;
  }
}
