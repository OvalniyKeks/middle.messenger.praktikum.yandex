import renderDom from './renderDom';

import { Chat } from '../pages/chat';
import { Profile } from '../pages/profile';
import { ProfileEdit } from '../pages/profile/edit';
import { ProfileEditPassword } from '../pages/profile/editPassword';
import { Login } from '../pages/login';
import { Register } from '../pages/register';

import { Error } from '../pages/error';

interface Route {
    name: string,
    path: string,
    component: any
}

const routes: Array<Route> = [
  { name: 'Chat', path: '/', component: Chat },
  { name: 'Profile', path: '/profile', component: Profile },
  { name: 'ProfileEdit', path: '/profile/edit', component: ProfileEdit },
  { name: 'ProfileEditPassword', path: '/profile/edit/password', component: ProfileEditPassword },
  { name: 'Login', path: '/login', component: Login },
  { name: 'Register', path: '/register', component: Register },

  { name: '404', path: '/404', component: Error },
];

export class Router {
  static init(): void {
    this._checkCurrentUrl();
    this._onListenerUrl();
  }

  static _checkCurrentUrl(): void {
    const path = window.location.pathname;
    const currentRoute = this._getRoute(path);
    Router.push(currentRoute.name);
  }

  static push(nameComponent: string): void {
    const routeObj = this._getRoute(nameComponent);

    this._setRoute(routeObj);
    renderDom(routeObj);
  }

  static _setRoute(route: Route): void {
    window.history.pushState({ name: route.name }, route.name, window.location.origin + route.path);
  }

  static _getRoute(searchParameter: string): any {
    const routeObj = routes.find((item) => item.name.toLowerCase() === searchParameter.toLowerCase() || item.path.toLowerCase() === searchParameter.toLowerCase());
    if (routeObj) {
      return routeObj;
    }
    return routes.find((item) => item.name === '404');
  }

  static _onListenerUrl(): void {
    window.addEventListener('popstate', (event) => {
      if (event?.state?.name) {
        const component = Router._getRoute(event.state.name);
        renderDom(component);
      } else {
        // Error
      }
    });
  }
}
