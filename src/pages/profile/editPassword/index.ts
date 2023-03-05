import { Block } from '../../../utils';
import { ChatBarAvatar } from '../../../components/chat/chatAvatar'
import { Button } from '../../../components/button'

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
		this.dataProfile = this._getDataProfile()

		this.children.ChatAvatar = new ChatBarAvatar({ className: ['chat-avatar'], src: this.dataProfile.image })

		this.children.ButtonSave = new Button({
			className: ['button'],
			label: "Сохранить",
			type: 'submit',
			name: 'save'
		})
	}

	render() {
		return `
    	<div class="card card-profile">
        {{ChatBarAvatar}}
        <div class="flex flex-column flex-around" style="margin-left: 20px;">
          <div class="card-profile__name">Антон</div>
          <div class="card-profile__phone">+7 (909) 643 34 43</div>
        </div>
      </div>
      <div class="card">
        
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
			login: 'keks'
		}
		return data
	}
}