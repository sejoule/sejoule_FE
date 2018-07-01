
export interface IAuthUser {
  id:          number;
  username:    string;
  firstName:   string;
  lastName:    string;
}

export interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  description: string;
  email: string;
  website: string;
  level: number;
  language: string;
}

export const empty_authuser: IAuthUser = {
  id:          -1,
  username:    'Anonymous',
  firstName:   'Anonymous',
  lastName:    ''
};

export const empty_user: IUser = {
  username: 'Anonymous',
  firstName: 'Anonymous',
  lastName: '',
  description: 'Unknown authuser account',
  email: 'unknown@onecloud.com',
  website: '',
  level: 1,
  language: 'en'
}
