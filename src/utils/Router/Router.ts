import renderDom from '../renderDom';
import { routes } from './Routes';
import { Route } from './Routes';
import store from '../Store';

export class Router {
  static init(): void {
    this._checkCurrentUrl();
    this._onListenerUrl();
  }

  private static _checkCurrentUrl(): void {
    const path = window.location.pathname;
    const currentRoute = this.getRoute(path);
    Router.push(currentRoute.name);
  }

  static push(nameComponent: string): void {
    let routeObj = this.getRoute(nameComponent);
    
    if (!store.getState().user && routeObj.auth) {
      routeObj = this.getRoute('Register')
    }

    this.setRoute(routeObj);
    renderDom(routeObj);

  }

  private static setRoute(route: Route): void {
    const path = window.location.origin + route.path
    const name = route.name

    if (window.history.state?.name !== route.name) {
      window.history.pushState({ name: name }, name, path);
    } else {
      window.history.replaceState({ name: name }, name, path);
    }
  }

  static getRoute(searchParameter: string): any {
    const routeObj = routes.find((item) => item.name.toLowerCase() === searchParameter.toLowerCase() || item.path.toLowerCase() === searchParameter.toLowerCase());
    if (routeObj) {
      return routeObj;
    }
    return routes.find((item) => item.name === '404');
  }

  private static _onListenerUrl(): void {
    window.addEventListener('popstate', (event) => {
      if (event?.state?.name) {
        const component = Router.getRoute(event.state.name);
        renderDom(component);
      } else {
        // Error
        return
      }
    });
  }
}
