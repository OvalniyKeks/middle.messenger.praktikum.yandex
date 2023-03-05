import { Block } from '../../utils';
import { Input } from '../input';
import { Button } from '../button';

interface LoginProps {
    className: Array<string>;
    name: string
    events ?: {
        submit: (event: SubmitEvent) => void;
    }
}

export class FormLogin extends Block {
  constructor(props: LoginProps) {
    super('form', props);
  }

  init() {
    this.props.className.forEach((element: string) => this.element!.classList.add(element));

        this.element!.setAttribute('data-id', this.props.name);

        this.children.InputLogin = new Input({
          className: ['form-input'], type: 'text', name: 'login', placeholder: 'Логин',
        });
        this.children.InputPassword = new Input({
          className: ['form-input'], type: 'password', name: 'password', placeholder: 'Пароль',
        });
        this.children.ButtonSubmit = new Button({
          className: ['form-button'], type: 'submit', name: 'submit', label: 'Войти',
        });
  }

  render() {
    return `
        <h2 class="form-title">Вход</h2>	
        {{{InputLogin}}}
        {{{InputPassword}}}
        {{{ButtonSubmit}}}
        `;
  }
}
