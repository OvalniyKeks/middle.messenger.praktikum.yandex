import API, { ChatsAPI } from '../api/ChatsApi';
import ProfileApi from '../api/ProfileApi';
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

    chats.map(async (chat) => {
      const token = await this.getToken(chat.id);

      await MessagesController.connect(chat.id, token);
    });
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
    let findestUser: any = await this.searchUser(login)
    if (findestUser) {
      findestUser = findestUser[0]
    } else {
      return
    }

    this.api.addUsers(id, [findestUser.id]).then(() => {
      this.getUsers(id)
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


    await this.getUsers(id)
  }
}

const ChatController = new ChatsController();

export default ChatController;
