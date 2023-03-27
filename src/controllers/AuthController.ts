import API, { AuthAPI, SigninData, SignupData } from '../api/AuthApi';
import store from '../utils/Store';
import Router from '../utils/Router';
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
          Router.go('/messenger');
        })
      })

    } catch (e: unknown) {
      console.error(e);
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data).then(() => {
        this.fetchUser().then(() => {
          Router.go('/messenger');
        })
      });

    } catch (e: unknown) {
      console.error(e);
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
      Router.go('/');

      store.set('user', null);
    } catch (e: unknown) {
      console.error(e);
    }
  }
}

export default new AuthController();
