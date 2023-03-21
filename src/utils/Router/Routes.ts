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
  component: any
}
export const routes: Array<Route> = [
  { name: 'Chat', path: '/messenger', component: Chat },
  { name: 'Profile', path: '/profile', component: Profile },
  { name: 'ProfileEdit', path: '/edit', component: ProfileEdit },
  { name: 'ProfileEditPassword', path: '/password', component: ProfileEditPassword },
  { name: 'Login', path: '/', component: Login },
  { name: 'Register', path: '/sign-up', component: Register },

  { name: '404', path: '/404', component: Error },
];
