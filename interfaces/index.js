export interface ICoords {
  latitude: number;
  longitude: number;
}

export interface TCurrentPost {
  photo: string;
  comment: string;
  countComments: number;
  place: string;
  location: ICoords | null;
  userId: string;
  nickName: string;
  countLike: string[];
  date: Date;
  id?: string;
}
