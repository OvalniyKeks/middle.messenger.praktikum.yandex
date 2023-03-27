import { Block, FormFn } from '../../../utils';
import { ChatBarAvatar } from '../../../components/chat/chatAvatar';
import { FormEditProfilePassword } from '../../../components/form/editprofilepassword';
import store from '../../../utils/Store';
import ProfileController from '../../../controllers/ProfileController';
import { Link } from '../../../components/link';
import { ProfilePassword } from '../../../types';

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

export class ProfileEditPassword extends Block {
  dataProfile: User;

  constructor(props: ProfileProps) {
    super('main', props);
  }

  init() {
		this.element!.classList.add('page', 'profile', 'flex', 'flex-center', 'flex-column');

		this.dataProfile = store.getState().user

		this.children.ChatAvatar = new ChatBarAvatar({ className: ['chat-avatar'], src: this.dataProfile.avatar, name: this.dataProfile.display_name ?? this.dataProfile.first_name });

		this.children.FormEditProfilePassword = new FormEditProfilePassword({
		  name: 'editprofilepassword',
		  className: ['form'],
		  events: {
		    submit: (event: SubmitEvent) => {
					event!.preventDefault();
					const resultCheck = FormFn.checkForm('editprofilepassword');
					if (resultCheck) {
					  this.onSubmit()
					}
		    },
		  },
		});
		this.children.LinkBack = new Link({
			className: ['link'],
			label: 'Назад',
			nameRoute: '/profile',
			arrow: false,
		});
  }

	onSubmit() {
		let fields = FormFn.getFields('editprofilepassword')

		let data: { [key: string]: any } = {}
		fields.forEach(field => {
			data[(field as HTMLInputElement).name] = (field as HTMLInputElement).value
		});

		ProfileController.updatePassword(data as ProfilePassword)
	}

  render() {
    return `
		<div style="margin-bottom: 20px">{{{LinkBack}}}</div>
    	<div class="card card-profile">
  		  {{{ ChatAvatar }}}
  		  <div class="flex flex-column flex-around" style="margin-left: 20px;">
  		    <div class="card-profile__name">${this.dataProfile.display_name ?? this.dataProfile.first_name}</div>
  		    <div class="card-profile__phone">${this.dataProfile.phone}</div>
  		  </div>
  		</div>
  		<div class="card">{{{FormEditProfilePassword}}}</div>
			`;
  }
}
