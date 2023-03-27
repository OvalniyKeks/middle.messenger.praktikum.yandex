import API, { ChatsAPI } from '../api/ChatsApi';
import ProfileApi from '../api/ProfileApi';
import { UserToChat } from '../types';
import { deepCopy } from '../utils/helpers';
import store from '../utils/Store';
import MessagesController from './MessagesController';

class ChatsController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = API;
  }

  async create(title: string) {
    await this.api.create(title);

    this.fetchChats();
  }

  async fetchChats() {
    store.set('chats.isLoading', true)
    const chats = await this.api.read();
    
    store.set('chats.list', chats);
    store.set('chats.isLoading', false)
  }

  async getUsers(chatId: number) {
    store.set('users.isLoading', true)

    const users =  await this.api.getUsers(chatId);
    store.set('users.list', users)

    store.set('users.isLoading', false)
  }

  async searchUser(login: string) {
    return await ProfileApi.searchUser({login});
  }

  async addUser(login: string, id: number) {
    const findestUsers: UserToChat[] = await this.searchUser(login)
    let user: { [key: string]: any }
    if (findestUsers) {
      user = findestUsers[0]
    } else {
      return
    }

    this.api.addUsers(id, [user.id]).then(() => {
      this.getUsers(id)
    })
  }

  async deleteUser(id: number, ChatId: number) {
    this.api.deleteUser(ChatId, [id]).then(() => {
      this.getUsers(ChatId)
    })
  }

  async delete(id: number) {
    await this.api.delete(id);

    this.fetchChats();
  }

  getToken(id: number) {
    return this.api.getToken(id);
  }

  async selectChat(id: number) {
    store.set('selectedChatId', id);

    this.setChatData(id)

    const token = await this.getToken(id);
    await MessagesController.connect(id, token);

    await this.getUsers(id)
  }

  setChatData(id: number) {
    let chats = store.getState().chats
    if (!chats) {
      return
    } else {
      chats = deepCopy(chats, [])
    }
    
    const chatData = chats.list.find((item: { id: number; }) => item.id === id)
    if (chatData) {
      store.set('chat', chatData)
    }
  }
}

export default new ChatsController()
