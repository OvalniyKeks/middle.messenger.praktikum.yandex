const Chats: Array<chat> = [
  {
    _id: '312312',
    image: 'https://wallpapers-clan.com/wp-content/uploads/2022/05/meme-pfp-04.jpg',
    name: 'Вадим',
    lastMessage: 'Правки сделал?',
    timeOrDate: '24.01.2023',
    countUnreadMessages: 12,
    selected: false,
  },
  {
    _id: '235325',
    image: 'https://wallpapers-clan.com/wp-content/uploads/2022/05/meme-pfp-04.jpg',
    name: 'Вадим1',
    lastMessage: 'Правки сделал?',
    timeOrDate: '24.01.2023',
    countUnreadMessages: 0,
    selected: false,
  },
  {
    _id: '2435235',
    image: 'https://wallpapers-clan.com/wp-content/uploads/2022/05/meme-pfp-04.jpg',
    name: 'Вадим2',
    lastMessage: 'Правки сделал?',
    timeOrDate: '24.01.2023',
    countUnreadMessages: 3,
    selected: false,
  },
  {
    _id: '453',
    image: 'https://wallpapers-clan.com/wp-content/uploads/2022/05/meme-pfp-04.jpg',
    name: 'Вадим3',
    lastMessage: 'Правки сделал?',
    timeOrDate: '24.01.2023',
    countUnreadMessages: 1,
    selected: false,
  },
  {
    _id: '3214412',
    image: 'https://wallpapers-clan.com/wp-content/uploads/2022/05/meme-pfp-04.jpg',
    name: 'Вадим4',
    lastMessage: 'Правки сделал?',
    timeOrDate: '24.01.2023',
    countUnreadMessages: 4,
    selected: false,
  },
];

interface chat {
	_id: string,
	image: string,
	name: string,
	lastMessage: string,
	timeOrDate: string,
	countUnreadMessages: number,
	selected: boolean
}

export class ChatsFn {
  static currentChat: chat | null;

  constructor() {
    ChatsFn.currentChat = null;
  }

  public static getChats(): any {
    return Chats;
  }

  public static getChat(_id: string): any {
    return this.getChats().find((item: { _id: string }) => item._id === _id);
  }

  public static changeChat(_id: string) {
    const chat = this.getChat(_id);
    if (chat) {
      chat.selected = true;
      ChatsFn.currentChat = chat;
    }
  }
}

// export function getChats(): any {
// 	return Chats
// }

// export function changeChat(id: string): void {
// 	const chat = Chats.find(item => item._id === id)
// 	if (chat) {
// 		chat.selected = true
// 		return chat
// 	}
// 	return;
// }
