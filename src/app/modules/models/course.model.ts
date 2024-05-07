import { Video } from "./video.model";

export class Course {
    id?: any;
    title?: string;
    description?: string;
    userId?: number;
    price?: number;
    rate?:number;
    videos?: Video[];
}
