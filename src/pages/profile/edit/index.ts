import { Block, FormFn } from '../../../utils';
import { FormEditProfile } from '../../../components/form/editprofile';
import store from '../../../utils/Store';
import { withStore } from '../../../utils/Store';
import ProfileController from '../../../controllers/ProfileController';
import { Link } from '../../../components/link';
import { AvatarEdit } from '../../../components/chat/ChatAvatarEdit';

interface ProfileProps {
	className: string;
}

class ProfileEditPage extends Block {

	constructor(props: ProfileProps) {
		super('main', props);
	}

	init() {
		this.element!.classList.add('page', 'profile', 'flex', 'flex-center', 'flex-column');

		this.children.ChatAvatarEdit = new AvatarEdit({
			className: ['form', 'form-avatar', 'flex-center'],
			id: 'uploadavatar',
			events: {
				submit: (event: SubmitEvent) => {
					event!.preventDefault()
					this.uploadPhoto(event.target as HTMLFormElement)
				}
			}
		})

		this.children.FormEditProfile = new FormEditProfileComponent({
			name: 'editprofile',
			className: ['form'],
			events: {
				submit: (event: SubmitEvent) => {
					event!.preventDefault();
					const resultCheck = FormFn.checkForm('editprofile');
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
		let fields = FormFn.getFields('editprofile')

		let data: { [key: string]: any } = {}
		fields.forEach(field => {
			data[(field as HTMLInputElement).name] = (field as HTMLInputElement).value
		});

		ProfileController.updateProfile({ ...store.getState().user, ...data })
	}

	uploadPhoto(form: HTMLFormElement) {
		let formData = new FormData(form)

		ProfileController.updateAvatar(formData)
	}

	render() {
		return `
			<div style="margin-bottom: 20px">{{{LinkBack}}}</div>
    	<div class="card card-profile">
			{{{ChatAvatarEdit}}}
  		</div>
  		<div class="card">{{{FormEditProfile}}}</div>
			`;
	}
}

export const ProfileEdit = withStore((state) => {
	return { user: state.user } || {}
})(ProfileEditPage as any)

export const FormEditProfileComponent = withStore((state) => {
	return { user: state.user }
})(FormEditProfile as any);
