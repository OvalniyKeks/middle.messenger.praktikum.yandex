import { set } from './helpers';
import { EventBus } from './EventBus';
import Block from './Block';
import { Chat, Message, Profile, User, UserToChat } from '../types';



export interface State {
  user?: {
    data?: User;
    error?: string;
    isLoading?: boolean;
  };
  users: {
    list: UserToChat[],
    isLoading: boolean;
  };
  chats?: {
    list: Chat[],
    isLoading: boolean
  };
  chat: Chat,
  selectedChatId?: number;
  messages?: Record<number, Message[]>,
  userSearch: Profile[];
  error?: string;
}

export enum StoreEvents {
  Updated = 'updated'
}

export class Store extends EventBus {
  private state: any = {};

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);

    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

export const withStore = (mapStateToProps: (state: State) => any) => (Component: typeof Block<any>) => {
  return class WithStore extends Component {
    constructor(props: unknown) {
      let previousState = mapStateToProps(store.getState());

      // @ts-ignore
      super({ ...(props as P), ...previousState });

      store.on(StoreEvents.Updated, () => {
        const stateProps = mapStateToProps(store.getState());

        previousState = stateProps;

        this.setProps({ ...stateProps });
      });
    }
  }
}

export default store;
