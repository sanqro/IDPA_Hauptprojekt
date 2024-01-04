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
  answer: string[];
  creator: string;
  key: string;
  public: boolean;
  question: string[];
  title: string;
  type: string;
}

export interface IFetchedSets {
  items: ISet[];
  count: number;
}

export interface ISetData {
  creator: string;
  title: string;
  question: string[];
  answer: string[];
  public: boolean;
  type: string;
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
  handlePairChange: (type: keyof ISet, index: number, value: string) => void;
  handleChange: (type: keyof ISet, value: string) => void;
  handleSaveClick: () => void;
  handleCancelClick: () => void;
}
