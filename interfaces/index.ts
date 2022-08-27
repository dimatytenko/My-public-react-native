export interface ICoord  {
  latitude: number;
  longitude: number;
}

export interface IPost  {
  photo: string;
  comment: string;
  countComments: number;
  place: string;
  location: ICoord | null;
  userId: string;
  nickName: string;
  countLike: string[];
  date: Date;
  id?: string;
}
