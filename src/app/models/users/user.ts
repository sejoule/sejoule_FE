
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
  description: string;
  email: string;
  website: string;
  level: number;
  language: string;
}

export const empty_authuser: IAuthUser = {
  id:          -1,
  username:    'Anonymous',
  first_name:   'Anonymous',
  last_name:    ''
};

export const empty_user: IUser = {
  username: 'Anonymous',
  first_name: 'Anonymous',
  last_name: '',
  description: 'Unknown authuser account',
  email: 'unknown@onecloud.com',
  website: '',
  level: 1,
  language: 'en'
}
