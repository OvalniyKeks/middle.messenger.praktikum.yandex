import { Block } from '../../utils';
import { ChatBarAvatar } from '../../components/chat/chatAvatar';
import { Link } from '../../components/link';
import AuthController from '../../controllers/AuthController';

interface ProfileProps {
	className: string;
}

interface User {
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
	display_name: string;
}

export class Profile extends Block {
	dataProfile: User;

	constructor(props: ProfileProps) {
		super('main', props);
	}

	init() {
		this.element!.classList.add('page', 'profile', 'flex', 'flex-center', 'flex-column');

		// @ts-ignore
		this.dataProfile = this._getDataProfile();

		this.children.ChatAvatar = new ChatBarAvatar({ className: ['chat-avatar'], src: this.dataProfile.avatar });

		this.children.LinkChangeData = new Link({
			className: ['link'],
			label: 'Изменить данные',
			nameRoute: 'ProfileEdit',
			arrow: true,
		});
		this.children.LinkChangePassword = new Link({
			className: ['link'],
			label: 'Изменить пароль',
			nameRoute: 'ProfileEditPassword',
			arrow: true,
		});
		this.children.LinkExit = new Link({
			className: ['link', 'link-red'],
			label: 'Выйти из аккаунта',
			nameRoute: 'login',
			arrow: true,
			events: {
				click: () => {
					AuthController.logout()
				}
			}
		});
		this.children.LinkBack = new Link({
			className: ['link'],
			label: 'В чаты',
			nameRoute: 'chat',
			arrow: false,
		});
	}

	render() {
		return `
			<div style="margin-bottom: 20px">{{{LinkBack}}}</div>
    	<div class="card card-profile">
  		  {{{ ChatAvatar}}}
  		  <div class="flex flex-column flex-around" style="margin-left: 20px;">
  		    <div class="card-profile__name">${this.dataProfile.display_name ?? this.dataProfile.first_name}</div>
  		    <div class="card-profile__phone">${this.dataProfile.phone}</div>
  		  </div>
  		</div>
  		<div class="card card-profile__info">
				<div class="card-profile__info-item">
					<div class="card-profile__info-label">Почта</div>
					<div class="card-profile__info-value">${this.dataProfile.email}</div>
				</div>
				<div class="card-profile__info-item">
					<div class="card-profile__info-label">Логин</div>
					<div class="card-profile__info-value">${this.dataProfile.login}</div>
				</div>
				<div class="card-profile__info-item">
					<div class="card-profile__info-label">Имя</div>
					<div class="card-profile__info-value">${this.dataProfile.first_name}</div>
				</div>
				<div class="card-profile__info-item">
					<div class="card-profile__info-label">Фамилия</div>
					<div class="card-profile__info-value">${this.dataProfile.first_name}</div>
				</div>
				<div class="card-profile__info-item">
					<div class="card-profile__info-label">Имя в чате</div>
					<div class="card-profile__info-value">${this.dataProfile.display_name}</div>
				</div>
  		</div>
  		<div class="card card-profile__action">
  		  {{{LinkChangeData}}}
				{{{LinkChangePassword}}}
				{{{LinkExit}}}
  		</div>`;
	}

	_getDataProfile() {
		const data = AuthController.fetchUser()
		return data;
	}
}
