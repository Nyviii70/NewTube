import { movie } from "./movie";

export interface actor {
    id: number,
    firstname: string,
    description: string,
    image: string,
    movies?: movie[]
}