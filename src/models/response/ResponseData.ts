export interface IResultsData {
  name: string;
  url: string;
}

export interface IResponseData {
  count: number;
  next: string | null;
  previous: string | null;
  results: IResultsData[];
}
