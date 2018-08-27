
export interface IAuthUser {
  id:          number;
  username:    string;
  first_name:   string;
  last_name:    string;
}

export interface IUser {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  level: number;
  language: string;
  account: IUserAccount;
}

export interface IUserAccount {
  description: string;
  website: string;
  avatar: string;
}

export const empty_authuser: IAuthUser = {
  id:          -1,
  username:    'Anonymous',
  first_name:   'Anonymous',
  last_name:    ''
};

export const init_account: IUserAccount = {
  description: 'Unknown authuser account',
  website: '',
  avatar: 'http://www.sejoule.com/media/avatars/generic-profile-avatar.jpg'
};

export const empty_user: IUser = {
  username: 'Anonymous',
  first_name: 'Anonymous',
  last_name: '',
  email: 'unknown@onecloud.com',
  level: 1,
  language: 'en',
  account: init_account
};
