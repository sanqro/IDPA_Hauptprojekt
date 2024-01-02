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
