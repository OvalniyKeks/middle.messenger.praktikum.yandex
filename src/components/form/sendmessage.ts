import { Block } from '../../utils';
import { Input } from '../input';
import { Button } from '../button';

interface MessageFormProps {
  className: Array<string>;
  name: string
  events?: {
    submit: (event: SubmitEvent) => void;
  }
}
0
export class MessageForm extends Block {
  constructor(props: MessageFormProps) {
    super('form', props);
  }

  init() {
    this.props.className.forEach((element: string) => this.element!.classList.add(element));

    this.element!.setAttribute('data-id', this.props.name);

    this.children.InputFIle = new Input({
			className: ['chat-message__input-file'], type: 'file', name: 'file', id: 'file',
		});

    this.children.InputMessage = new Input({
      className: ['input-field', 'chat-message__input-text'], type: 'text', name: 'message', placeholder: 'Введите сообщение', id: 'message', autocomplete: 'off'
    });
    this.children.ButtonSubmit = new Button({
      className: ['button', 'chat-message__input-send'], type: 'submit', name: 'send', label: 'Отправить',
    });

  }

  render() {
    return `
      <label for="file" class="chat-message__input-file_label">📁{{{InputFIle}}}</label>
      {{{InputMessage}}}
      {{{ButtonSubmit}}}
        `;
  }
}
