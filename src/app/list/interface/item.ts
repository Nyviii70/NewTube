import { movie } from "./movie";

export interface Item {
    searchType: string,
    expression: string,
    results: movie[]
}