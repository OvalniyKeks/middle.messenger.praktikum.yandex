import { Block, FormFn, Router } from '../../utils';
import { FormRegister } from '../../components/form/register';

interface RegisterProps {
	className: string;
}

export class Register extends Block {
  constructor(props: RegisterProps) {
    super('main', props);
  }

  init() {
		this.element!.classList.add('page', 'flex', 'flex-center');

		this.children.FormRegister = new FormRegister({
		  name: 'register',
		  className: ['form-register', 'form'],
		  events: {
		    submit: (event: SubmitEvent) => {
					event!.preventDefault();
					const resultCheck = FormFn.checkForm('register');
					if (resultCheck) {
					  console.log(FormFn.getFields('register'));
					  Router.push('chat');
					}
		    },
		  },
		});
  }

  render() {
    return `
    <div class="card">
		<h2 class="form-title">Регистрация</h2>
			{{{FormRegister}}}
    </div>
    `;
  }
}
