

export interface IOnClickButton {
  onClick: () => void;
  label: string;
  className?: string;
}

export interface INavigationButton {
  children: string;
  destination: string;
}
