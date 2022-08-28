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
  location: ICoord | null;
  userId: string | null;
  nickName: string | number | null;
  countLike: string[]|[];
  date:Date | {seconds: number, nanoseconds: number};
  id: string;
}

export interface IInitialState {
  userId: string | null;
  nickName: string | number | null;
  email?: string | null;
  stateChange?: boolean;
  errorLogin?: boolean;
}