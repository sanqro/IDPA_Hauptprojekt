export interface IOnClickButton {
  onClick: () => void;
  label: string;
  className?: string;
}

export interface INavigationButton {
  children: string;
  destination: string;
}

export interface ISet {
  key: string; // username of creator + set key
  creator: string;
  title: string;
  question: IQuestionItem[];
  public: boolean;
  type: string;
}

export interface IQuestionItem {
  question: string;
  questionType: QuestionType;
  options?: string[];
  correctAnswer: string | boolean;
  userResponse?: string | boolean;
}

export enum QuestionType {
  MultipleChoice = "multipleChoice",
  TrueFalse = "trueFalse",
  TextInput = "textInput",
}

export interface IFetchedSets {
  items: ISet[];
  count: number;
}

export interface InputField {
  type: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ISmallSetDisplay {
  label: string;
  className?: string;
  set: ISet;
  onClick: () => void;
}

export interface IUpdateView {
  selectedSet: ISet;
  handleChange: (type: keyof ISet, value: string) => void;
  handleSaveClick: () => void;
  handleCancelClick: () => void;
}

export interface IAuthContext {
  token: string | null;
  username: string | null;
  isLoggedIn: () => boolean;
  handleLogOut: () => void;
}

export interface IQUizInput {
  selectedSet: ISet;
}

export interface IHelpModal {
  closeModal: () => void;
}
