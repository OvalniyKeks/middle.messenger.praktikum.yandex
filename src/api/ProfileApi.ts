import BaseApi from './BaseApi';

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
  oldPassword: string;
  newPassword: string;
}

export interface ProfileSearch {
  login: string;
}

export class ProfileApi extends BaseApi {
  constructor() {
    super('/user');
  }

  read(identifier: string): Promise<Profile> {
    return this.http.get(`/${identifier}`);
  }

  update(data: Profile): Promise<Profile> {
    return this.http.put("/profile", data);
  }

  loadAvatar(data: FormData): Promise<Profile> {
    return this.http.put("/profile/avatar", data);
  }

  changePassword(data: ProfilePassword): Promise<any> {
    return this.http.put("/password", data);
  }

  searchUser(data: ProfileSearch): Promise<Profile> {
    return this.http.post("/search", data);
  }

  create = undefined;
  delete = undefined;

}

export default new ProfileApi();
