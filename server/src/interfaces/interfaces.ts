export interface IAuthFormData {
  username: string;
  password: string;
}

export interface ISetData {
  key: string; // username of creator + set key
  creator: string;
  title: string;
  question: IQuestionItem[];
  public: boolean;
  type: string;
}

export interface IQuestionItem {
  questionType: QuestionType;
  options?: string[];
  correctAnswer: string | boolean;
  userResponse?: string | boolean;
}

enum QuestionType {
  MultipleChoice = "multipleChoice",
  TrueFalse = "trueFalse",
  TextInput = "textInput"
}
export interface IScoreData {
  key: string; // username + set key
  username: string;
  set: string;
  score: number;
}

export interface IJWTPayload {
  username: string;
}
