import { IResultsData } from '../ResultsData';
export interface IResponseData {
    count: number,
    next: string | null, 
    previous: string | null,
    results: IResultsData[]
}