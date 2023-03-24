import { set } from './helpers';
import { EventBus } from './EventBus';
import Block from './Block';

interface User {
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
}

interface UserToChat {
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  display_name: string;
}

interface Chat {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: User,
    time: string;
    content: string;
  }
}
interface Profile {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}
interface Message {
  chat_id: number;
  time: string;
  type: string;
  user_id: number;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  }
}

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
    constructor(props: any) {
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
