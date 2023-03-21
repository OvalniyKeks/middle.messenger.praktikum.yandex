import { Router } from ".";
import AuthController from "../controllers/AuthController";
export function initApp () {
  
  AuthController.fetchUser()
  .then(res => {
    if (res?.id) {
      Router.init();
    }
  })
  .catch(err => {
    Router.push("Login")
  });
  
}
