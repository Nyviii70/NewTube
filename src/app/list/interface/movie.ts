import { actor } from "./actor";

export interface movie {
    id: number,
    firstname: string,
    description: string,
    image: string,
    actors: actor[]
}