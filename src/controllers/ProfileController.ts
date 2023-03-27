import ProfileApi from "../api/ProfileApi";
import { Profile, ProfilePassword } from "../types";
import Router from "../utils/Router";
import store from "../utils/Store";

class ProfileController {

  async updateProfile(data: Profile) {
    try {
      const user = await ProfileApi.update(data);

      store.set("user", user);

      Router.go('/profile');
    } catch (e: unknown) {
      store.set('user', (e as Error))
    }
  }

  async updateAvatar(data: FormData) {
    try {
      const user = await ProfileApi.loadAvatar(data);

      store.set("user", user);
    } catch (e: unknown) {
      store.set('user', (e as Error))
    }
  }

  async updatePassword(data: ProfilePassword) {
    try {
      await ProfileApi.changePassword(data);

      Router.go('/profile')


    } catch (e: unknown) {
      store.set('user', e as Error)
    }
  }

}

export default new ProfileController();
