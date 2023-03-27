import { Block, FormFn } from '../../utils';
import { FormLogin } from '../../components/form/login';
import { SigninData } from '../../api/AuthApi';
import AuthController from '../../controllers/AuthController';

interface LoginProps {
	className: string;
}

export class Login extends Block {
	constructor(props: LoginProps) {
		super('main', props);
	}

	init() {
		this.element!.classList.add('page', 'auth', 'flex', 'flex-center');

		this.children.FormLogin = new FormLogin({
			name: 'login',
			className: ['form-auth', 'form'],
			events: {
				submit: (event: SubmitEvent) => {
					event!.preventDefault();
					const resultCheck = FormFn.checkForm('login');
					if (resultCheck) {
						this.onSubmit()
					}
				},
			},
		});
	}

	onSubmit() {
		let data: { [key: string]: any } = {}
    FormFn.getFields('login').map(input => {
			data[(input as HTMLInputElement).name] = (input as HTMLInputElement).value
		});

    AuthController.signin(data as SigninData);
  }

	render() {
		return `
    <div class="card flex flex-align__center">
		{{{FormLogin}}}
    </div>
    `;
	}
}
