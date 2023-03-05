export default function renderDOM (route: any) {
  const root = document.querySelector('#app');
  root!.innerHTML = '';

  const PageComponent = route.component

  const currentPage = new PageComponent({ className: "page"});

  root!.appendChild(currentPage!.element);
  currentPage.dispatchComponentDidMount();

}