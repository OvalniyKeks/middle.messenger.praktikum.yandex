import { Chat } from '../../pages/chat';
import { Profile } from '../../pages/profile';
import { ProfileEdit } from '../../pages/profile/edit';
import { ProfileEditPassword } from '../../pages/profile/editPassword';
import { Login } from '../../pages/login';
import { Register } from '../../pages/register';

import { Error } from '../../pages/error';


export interface Route {
  name: string,
  path: string,
  auth: boolean,
  component: any
}
export const routes: Array<Route> = [
  { name: 'Chat', path: '/messenger', auth: true, component: Chat },
  { name: 'Profile', path: '/profile', auth: true, component: Profile },
  { name: 'ProfileEdit', path: '/edit', auth: true, component: ProfileEdit },
  { name: 'ProfileEditPassword', path: '/password', auth: true, component: ProfileEditPassword },
  { name: 'Login', path: '/', auth: false, component: Login },
  { name: 'Register', path: '/sign-up', auth: false, component: Register },

  { name: '404', path: '/404', auth: false, component: Error },
];
