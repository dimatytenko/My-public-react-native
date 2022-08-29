export interface ICoord  {
  latitude: number;
  longitude: number;
}
export interface IUser{
  email:string, password: string, nickName?: string
}
export interface IPost  {
  photo: string;
  comment: string;
  countComments: number;
  place: string;
  location: ICoord;
  userId: string | null;
  nickName: string | number | null;
  countLike: string[]|[];
  date: {seconds: number, nanoseconds: number};
  id: string;
}
export interface IInitialState {
  userId: string | null;
  nickName: string | number | null;
  email?: string | null;
  stateChange?: boolean;
  errorLogin?: boolean;
}

export type AuthStackParamList = {
  Login: undefined
  Register: undefined
}

export type MainBottomTabParamList = {
  Posts: undefined
  CreatePosts: undefined
  Profile: undefined  
}; 

export type PostsStackParamList = {
  DefaultScreen: undefined
  Comments: {  postId: string, photo: string}
  Map: {location: ICoord}
}