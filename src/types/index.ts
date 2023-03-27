export interface User {
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
}

export interface UserToChat {
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
  role?: string;
  display_name: string;
}

export interface Chat {
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
export interface Profile {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface ProfilePassword {
  oldPassword: string,
  newPassword: string
}

export interface ProfileSearch {
  login: string;
}

export interface Message {
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

export interface errorText {
  login: string,
  password: string,
  email: string,
  first_name: string,
  second_name: string,
  phone: string,
  repeatPassword: string
}

export interface Route {
  name: string,
  path: string,
  auth: boolean,
  component: any
}
