import ProfileApi from "../api/ProfileApi";
import {Router} from "../utils/Router/Router";
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

      store.set("user.data", user);

      Router.push('profile');
    } catch (e: any) {
      store.set('user.error', (e as Error))
    }
  }

  async updateAvatar(data: FormData) {
    try {
      const user = await ProfileApi.loadAvatar(data);

      store.set("user.data", user);
    } catch (e: any) {
      store.set('user.error', (e as Error))
    }
  }

  async updatePassword(data: ProfilePassword) {
    try {
      const user = await ProfileApi.changePassword(data);

      store.set("user.data", user);
    } catch (e: any) {
      store.set('user.error', e as Error)
    }
  }

  async findProfile (data: ProfileSearch) {
    store.set("userSearch", undefined);

    try {
      const user = await ProfileApi.searchUser(data);

      store.set("userSearchResults", user);
    } catch (e: any) {
      store.set('user.error', e as Error)
    }
  }

}

export default new ProfileController();
