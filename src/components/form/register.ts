import { Block } from '../../utils';
import { Input } from '../input';
import { Button } from '../button';


interface RegisterProps {
    className: Array<string>;
    name: string
    events?: {
        submit: (event: SubmitEvent) => void;
    }
}

export class FormRegister extends Block {
    constructor(props: RegisterProps) {
        super('form', props);
    }

    init() {
        this.props.className.forEach((element: string) => this.element!.classList.add(element));

        this.element!.setAttribute('data-id', this.props.name)

        this.children.InputEmail = new Input({ className: ['form-input'], type: 'email', name: 'email', placeholder: 'Email' })
        this.children.InputLogin = new Input({ className: ['form-input'], type: 'text', name: 'login', placeholder: 'Логин' })
        this.children.InputName = new Input({ className: ['form-input'], type: 'text', name: 'first_name', placeholder: 'Имя' })
        this.children.InputSurname = new Input({ className: ['form-input'], type: 'text', name: 'second_name', placeholder: 'Фамилия' })
        this.children.InputPhone = new Input({ className: ['form-input'], type: 'tel', name: 'phone', placeholder: 'Телефон' })
        this.children.InputPassword = new Input({ className: ['form-input'], type: 'password', name: 'password', placeholder: 'Пароль' })
        this.children.InputRepeatPassword = new Input({ className: ['form-input'], type: 'password', name: 'repeatPassword', placeholder: 'Повторите пароль' })
        this.children.ButtonSubmit = new Button({ className: ['form-button'], type: 'submit', name: 'submit', label: 'Зарегистрироваться' })
    }

    render() {
        return `
        {{{InputEmail}}}
        {{{InputLogin}}}
        {{{InputName}}}
        {{{InputSurname}}}
        {{{InputPhone}}}
        {{{InputPassword}}}
        {{{InputRepeatPassword}}}
        {{{ButtonSubmit}}}
        `;
    }
}