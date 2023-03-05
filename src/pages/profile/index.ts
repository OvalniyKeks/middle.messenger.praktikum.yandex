import { Block } from '../../utils';
import { ChatBarAvatar } from '../../components/chat/chatAvatar';
import { Link } from '../../components/link';

interface ProfileProps {
	className: string;
}

interface ProfileDataProps {
	image: string,
	name: string,
	surname: string,
	chat_name: string,
	phone: string,
	email: string,
	login: string
}

export class Profile extends Block {
  dataProfile: ProfileDataProps;

  constructor(props: ProfileProps) {
    super('main', props);
  }

  init() {
    this.dataProfile = this._getDataProfile();

    this.children.ChatAvatar = new ChatBarAvatar({ className: ['chat-avatar'], src: this.dataProfile.image });

    this.children.LinkChangeData = new Link({
      className: ['link'],
      label: 'Изменить данные',
      nameRoute: 'ProfileEdit',
      arrow: true,
    });
    this.children.LinkChangePassword = new Link({
      className: ['link'],
      label: 'Изменить пароль',
      nameRoute: 'profileEditPassword',
      arrow: true,
    });
    this.children.LinkExit = new Link({
      className: ['link', 'link-red'],
      label: 'Выйти из аккаунта',
      nameRoute: 'login',
      arrow: true,
    });
  }

  render() {
    return `
    	<div class="card card-profile">
  		  {{{ ChatAvatar}}}
  		  <div class="flex flex-column flex-around" style="margin-left: 20px;">
  		    <div class="card-profile__name">${this.dataProfile.name}</div>
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
					<div class="card-profile__info-value">${this.dataProfile.name}</div>
				</div>
				<div class="card-profile__info-item">
					<div class="card-profile__info-label">Фамилия</div>
					<div class="card-profile__info-value">${this.dataProfile.surname}</div>
				</div>
				<div class="card-profile__info-item">
					<div class="card-profile__info-label">Имя в чате</div>
					<div class="card-profile__info-value">${this.dataProfile.chat_name}</div>
				</div>
  		</div>
  		<div class="card card-profile__action">
  		  {{{LinkChangeData}}}
				{{{LinkChangePassword}}}
				{{{LinkExit}}}
  		</div>`;
  }

  _getDataProfile() {
    const data: any = {
      image: 'https://i.ytimg.com/vi/eXwZMAz9Vh8/maxresdefault.jpg',
      name: 'Антон',
      surname: 'Попов',
      chat_name: 'Антон',
      phone: '+7 (909) 643 34 43',
      email: 'keks_practicum@gmail.com',
      login: 'keks',
    };
    return data;
  }
}
