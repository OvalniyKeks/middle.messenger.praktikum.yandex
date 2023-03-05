import { Block, FormFn, Router } from '../../../utils';
import { ChatBarAvatar } from '../../../components/chat/chatAvatar';
import { FormEditProfilePassword } from '../../../components/form/editprofilepassword';

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

export class ProfileEditPassword extends Block {
  dataProfile: ProfileDataProps;

  constructor(props: ProfileProps) {
    super('main', props);
  }

  init() {
		this.element!.classList.add('page', 'profile', 'flex', 'flex-center', 'flex-column');

		this.dataProfile = this._getDataProfile();

		this.children.ChatAvatar = new ChatBarAvatar({ className: ['chat-avatar'], src: this.dataProfile.image });

		this.children.FormEditProfilePassword = new FormEditProfilePassword({
		  name: 'editprofilepasword',
		  className: ['form'],
		  events: {
		    submit: (event: SubmitEvent) => {
					event!.preventDefault();
					const resultCheck = FormFn.checkForm('editprofilepassword');
					if (resultCheck) {
					  console.log(FormFn.getFields('editprofilepassword'));
					  Router.push('profile');
					}
		    },
		  },
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
  		<div class="card">{{{FormEditProfilePassword}}}</div>
			`;
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
