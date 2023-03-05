import { Block, FormFn, Router } from '../../utils';
import { FormLogin } from '../../components/form/login';

interface LoginProps {
	className: string;
}

export class Login extends Block {
  constructor(props: LoginProps) {
    super('main', props);
  }

  init() {
    this.children.FormLogin = new FormLogin({
      name: 'login',
      className: ['form-auth', 'form'],
      events: {
        submit: (event: SubmitEvent) => {
					event!.preventDefault();
					const resultCheck = FormFn.checkForm('login');
					if (resultCheck) {
					  console.log(FormFn.getFields('login'));
					  Router.push('chat');
					}
        },
      },
    });
  }

  render() {
    return `
    <div class="card flex flex-align__center">
				{{{FormLogin}}}
        <img src="../assets/images/auth_form.png" alt="">
    </div>
    `;
  }
}
