import { User } from "./User";

export interface Post {
    postId : number;
    title : string,
    description : string;
    likes : number;
    createdBy : number
};