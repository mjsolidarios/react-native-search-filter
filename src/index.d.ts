declare module "react-native-search-filter" {
  import * as React from "react";
  import { TextInputProps } from "react-native";

  export type SearchInputFilterKeys = any;

  export interface SearchInputProps extends TextInputProps {
    caseSensitive?: boolean;
    clearIcon?: React.ReactNode;
    clearIconViewStyles?: Object;
    filterKeys?: SearchInputFilterKeys;
    fuzzy?: boolean;
    inputFocus?: boolean;
    inputViewStyles?: Object;
    onChange?: (...args: any[]) => any;
    onSubmitEditing?: (...args: any[]) => any;
    sortResults?: boolean;
    throttle?: number;
    value?: string;
  }

  function createFilter(
    term: string,
    keys: Array<any>,
    options?: any
  ): () => void;

  export default class SearchInput extends React.Component<SearchInputProps> {
    render(): JSX.Element;
  }
}
