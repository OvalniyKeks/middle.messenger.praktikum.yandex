import { Block } from '../../utils';
import { Input } from '../input';
import { Button } from '../button';
import { Link } from '../link';

interface LoginProps {
  className: Array<string>;
  name: string
  events?: {
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
      className: ['form-input'], type: 'text', name: 'login', placeholder: 'Логин', id: 'login'
    });
    this.children.InputPassword = new Input({
      className: ['form-input'], type: 'password', name: 'password', placeholder: 'Пароль', id: 'password'
    });
    this.children.ButtonSubmit = new Button({
      className: ['form-button'], type: 'submit', name: 'submit', label: 'Войти',
    });
    this.children.LinkRegister = new Link({
      className: ['link'], nameRoute: 'Register', label: 'Зарегистрироваться', arrow: false
    })

  }

  render() {
    return `
        <h2 class="form-title">Вход</h2>	
        {{{InputLogin}}}
        {{{InputPassword}}}
        {{{ButtonSubmit}}}
        <div class="form-bottom flex flex-center"><span style="margin-right: 5px">Нет аккаунта?</span> {{{LinkRegister}}}</div>
        `;
  }
}
