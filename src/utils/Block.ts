import * as Handlebars from 'handlebars';
import { nanoid } from 'nanoid/non-secure';
import { EventBus } from './EventBus';

class Block<P extends Record<string, any> = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_RENDER: 'flow:render',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
  };

  public id = nanoid(6);

  private _meta: { tagName: string; props: any };

  protected props: P;

  private eventBus: () => EventBus;

  private _element: HTMLElement | null = null;

  public children: Record<string, Block | Block[]>;

  /** JSDoc
   * @param {string} tagName
   * @param propsWithChildren
   *
   * @returns {void}
   */
  constructor(tagName = 'div', propsWithChildren: P) {
    const eventBus = new EventBus();
    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this._meta = {
      tagName,
      props,
    };

    this.children = children;
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildrenAndProps(childrenAndProps: P): { props: P, children: Record<string, Block | Block[]> } {
    const props: Record<string, unknown> = {};
    const children: Record<string, Block | Block[]> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0 && value.every((v) => v instanceof Block)) {
        children[key as string] = value;
      } else if (value instanceof Block) {
        children[key as string] = value;
      } else {
        props[key] = value;
      }
    });

    return { props: props as P, children };
  }

  _addEvents() {
    const { events = {} } = this.props as P & { events: Record<string, () => void> };

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    if (!tagName) {
      return;
    }
    this._element = this._createDocumentElement(tagName);
  }

  private _init() {
    this._createResources();

    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() { }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() { }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((ch) => ch.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  private _componentDidUpdate(oldProps: P, newProps: P) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected componentDidUpdate(oldProps: P, newProps: P) {
    return true;
  }

  setProps = (nextProps: Partial<P>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _removeEvents(): void {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName: string) => {
      this._element!.removeEventListener(eventName, events[eventName]);
    });
  }

  private _render() {
    const template = this.render();

    const fragment = this.compile(template, this.props);

    this._removeEvents();

    this._element!.innerHTML = '';

    this._element!.append(fragment);

    this._addEvents();
  }

  protected compile(template: string, context: any) {
    const contextAndStubs = { ...context };

    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        contextAndStubs[name] = component.map((child) => {
          if (!child) {
            return
          }
          return `<div data-id="${child.id}"></div>`
        });
      } else {
        contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
      }
    });

    const templateDelegate = Handlebars.compile(template);

    const html = templateDelegate(contextAndStubs);

    const temp = document.createElement('template');

    temp.innerHTML = html;

    const replaceStub = (component: Block) => {
      if (!component) {
        return
      }
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

      if (!stub) {
        return;
      }

      component.getContent()?.append(...Array.from(stub.childNodes));

      stub.replaceWith(component.getContent()!);
    };

    Object.entries(this.children).forEach(([_, component]) => {
      if (Array.isArray(component)) {
        component.forEach(replaceStub);
      } else {
        replaceStub(component);
      }
    });

    return temp.content;
  }

  render(): string {
    return '';
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: P) {
    // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop as keyof P];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target };

        target[prop as keyof P] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show() {
    this.getContent()!.style.display = 'block';
  }

  hide() {
    this.getContent()!.style.display = 'none';
  }
}

export default Block;
