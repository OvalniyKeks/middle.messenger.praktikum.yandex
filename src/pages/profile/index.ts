import { Block } from '../../utils';
import { ChatBarAvatar } from '../../components/chat/chatAvatar';
import { Link } from '../../components/link';
import AuthController from '../../controllers/AuthController';
import { withStore } from '../../utils/Store';

interface ProfileProps {
	className: string;
}

export class ProfileBase extends Block {

	constructor(props: ProfileProps) {
		super('main', props);
	}

	init() {
		this.element!.classList.add('page', 'profile', 'flex', 'flex-center', 'flex-column');

		this.children.ChatAvatar = new ChatBarAvatar({ className: ['chat-avatar'], src: this.props.user.avatar, name: this.props.user.display_name ?? this.props.user.first_name });

		this.children.LinkChangeData = new Link({
			className: ['link'],
			label: 'Изменить данные',
			nameRoute: '/edit',
			arrow: true,
		});
		this.children.LinkChangePassword = new Link({
			className: ['link'],
			label: 'Изменить пароль',
			nameRoute: '/password',
			arrow: true,
		});
		this.children.LinkExit = new Link({
			className: ['link', 'link-red'],
			label: 'Выйти из аккаунта',
			nameRoute: '/',
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
			nameRoute: '/messenger',
			arrow: false,
		});
	}

	render() {
		return `
			<div style="margin-bottom: 20px">{{{LinkBack}}}</div>
    	<div class="card card-profile">
  		  {{{ ChatAvatar}}}
  		  <div class="flex flex-column flex-around" style="margin-left: 20px;">
  		    <div class="card-profile__name">${this.props.user.display_name ?? this.props.user.first_name}</div>
  		    <div class="card-profile__phone">${this.props.user.phone}</div>
  		  </div>
  		</div>
  		<div class="card card-profile__info">
				<div class="card-profile__info-item">
					<div class="card-profile__info-label">Почта</div>
					<div class="card-profile__info-value">${this.props.user.email}</div>
				</div>
				<div class="card-profile__info-item">
					<div class="card-profile__info-label">Логин</div>
					<div class="card-profile__info-value">${this.props.user.login}</div>
				</div>
				<div class="card-profile__info-item">
					<div class="card-profile__info-label">Имя</div>
					<div class="card-profile__info-value">${this.props.user.first_name}</div>
				</div>
				<div class="card-profile__info-item">
					<div class="card-profile__info-label">Фамилия</div>
					<div class="card-profile__info-value">${this.props.user.first_name}</div>
				</div>
				<div class="card-profile__info-item">
					<div class="card-profile__info-label">Имя в чате</div>
					<div class="card-profile__info-value">${this.props.user.display_name}</div>
				</div>
  		</div>
  		<div class="card card-profile__action">
  		  {{{LinkChangeData}}}
				{{{LinkChangePassword}}}
				{{{LinkExit}}}
  		</div>`;
	}
}


export const Profile = withStore((state) => {
	return {user: state.user} || {}
})(ProfileBase as any)
