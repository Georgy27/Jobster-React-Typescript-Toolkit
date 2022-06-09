// export interface PostUserData {
//   name: string;
//   email: string;
// }

export interface RegisterState {
  name: string,
  email: string;
  password: string;
}

export interface LoginState {
  // name?: string,
  email: string;
  password: string;
}
export interface UserData {
  name: string;
  email: string;
  lastName: string;
  location: string;
  token?: string;
}

export interface LoginError {
  msg: string;
}