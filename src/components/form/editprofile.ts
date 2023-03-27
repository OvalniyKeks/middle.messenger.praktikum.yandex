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

export class FormEditProfile extends Block {
  constructor(props: EditProfileProps) {
    super('form', props);
  }

  init() {
    this.props.className.forEach((element: string) => this.element!.classList.add(element));

        this.element!.setAttribute('data-id', this.props.name);
        
        this.children.InputEmail = new Input({
        	className: ['form-input'], type: 'email', name: 'email', placeholder: 'Email', value: this.props.user.email
        });
        this.children.InputPhone = new Input({
        	className: ['form-input'], type: 'tel', name: 'tel', placeholder: 'Телефон', value: this.props.user.phone
        });
        this.children.InputLogin = new Input({
        	className: ['form-input'], type: 'text', name: 'login', placeholder: 'Логин', value: this.props.user.login
        });
        this.children.InputName = new Input({
        	className: ['form-input'], type: 'text', name: 'first_name', placeholder: 'Имя', value: this.props.user.first_name
        });
        this.children.InputSurname = new Input({
        	className: ['form-input'], type: 'text', name: 'second_name', placeholder: 'Фамилия', value: this.props.user.second_name
        });
        this.children.InputChatName = new Input({
        	className: ['form-input'], type: 'text', name: 'display_name', placeholder: 'Имя в чате', value: this.props.user.display_name
        });
        this.children.ButtonSubmit = new Button({
        	className: ['form-button'], type: 'submit', name: 'submit', label: 'Сохранить',
        });
  }

  render() {
    return `
        {{{InputEmail}}}
        {{{InputPhone}}}
        {{{InputLogin}}}
        {{{InputName}}}
        {{{InputSurname}}}
        {{{InputChatName}}}
        {{{ButtonSubmit}}}
        `;
  }
}
