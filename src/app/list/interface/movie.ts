import { actor } from "./actor";

export interface movie {
    id: number,
    title: string,
    description: string,
    image: string,
    actors: actor[]
}