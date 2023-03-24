import ProfileApi from "../api/ProfileApi";
import { Router } from "../utils/Router/Router";
import store from "../utils/Store";
export interface Profile {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface ProfilePassword {
  oldPassword: string;
  newPassword: string;
}

export interface ProfileSearch {
  login: string;
}

class ProfileController {

  async updateProfile(data: Profile) {
    try {
      const user = await ProfileApi.update(data);

      store.set("user", user);

      Router.push('profile');
    } catch (e: any) {
      store.set('user', (e as Error))
    }
  }

  async updateAvatar(data: FormData) {
    try {
      const user = await ProfileApi.loadAvatar(data);

      store.set("user", user);
    } catch (e: any) {
      store.set('user', (e as Error))
    }
  }

  async updatePassword(data: ProfilePassword) {
    try {
      await ProfileApi.changePassword(data);

      Router.push('profile')


    } catch (e: any) {
      store.set('user', e as Error)
    }
  }

}

export default new ProfileController();
