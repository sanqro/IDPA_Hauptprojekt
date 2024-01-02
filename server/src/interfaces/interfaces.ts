export interface IAuthFormData {
  username: string;
  password: string;
}

export interface ISetData {
  key: string; // username of creator + set key
  creator: string;
  title: string;
  question: string[];
  answer: string[];
  public: boolean;
}

export interface IScoreData {
  key: string; // username + set key
  username: string;
  set: string;
  score: number;
}
