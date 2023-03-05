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
        this.children.InputPassword = new Input({
          className: ['form-input'], type: 'password', name: 'password', placeholder: 'Пароль',
        });
        this.children.InputRepeatPassword = new Input({
          className: ['form-input'], type: 'password', name: 'repeatPassword', placeholder: 'Повторите пароль',
        });
        this.children.ButtonSubmit = new Button({
          className: ['form-button'], type: 'submit', name: 'submit', label: 'Сохранить',
        });
  }

  render() {
    return `
        
        {{{InputPassword}}}
        {{{InputRepeatPassword}}}
        {{{ButtonSubmit}}}
        `;
  }
}
