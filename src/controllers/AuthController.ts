import API, { AuthAPI, SigninData, SignupData } from '../api/AuthApi';
import store from '../utils/Store';
import { Router } from '../utils';
import MessagesController from './MessagesController';

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  signin(data: SigninData) {
    try {
      this.api.signin(data).then(() => {
        this.fetchUser().then(() => {
          Router.push('Chat');
        })
      })

    } catch (e: any) {
      console.error(e);
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);

      Router.push('Chat');
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async fetchUser() {
    const user = await this.api.read();

    store.set('user', user);

    return user
  }

  async logout() {
    try {
      MessagesController.closeAll();

      await this.api.logout();

      Router.push('Login');
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new AuthController();
