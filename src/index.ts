import { Login } from './pages/Login';
import { Register } from './pages/Register';
import Router from './utils/Router';
import { Profile } from './pages/Profile';
import AuthController from './controllers/AuthController';
import { Chat } from './pages/chat';
import { ProfileEdit } from './pages/profile/edit';
import { ProfileEditPassword } from './pages/profile/editPassword';

enum Routes {
  Index = '/',
  Register = '/register',
  Profile = '/profile',
  ProfileEdit = '/edit',
  ProfilePassword = '/password',
  Messenger = '/messenger'
}

window.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(Routes.Index, Login)
    .use(Routes.Register, Register)
    .use(Routes.Profile, Profile)
    .use(Routes.ProfileEdit, ProfileEdit)
    .use(Routes.ProfilePassword, ProfileEditPassword)
    .use(Routes.Messenger, Chat)

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Register:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.fetchUser();

    Router.start();

    if (!isProtectedRoute) {
      Router.go(Routes.Profile)
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.Index);
    }
  }

});
