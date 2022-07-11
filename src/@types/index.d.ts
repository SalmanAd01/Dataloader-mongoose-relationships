import { Document } from "mongoose";
export interface UserDocument extends Document {
    _id: string;
    name:String;
    email:String;
    password:String;
    socialMedia:SocialMediaDocument["_id"];
    posts:PostDocument["_id"][];
}
export interface PostDocument extends Document {
    title:String;
    description:String;
    creator:UserDocument["_id"];
}

export interface SocialMediaDocument extends Document {
    media:Array<{
        name:String;
        url:String;
    }>;
    belongsTo:UserDocument["_id"];
}
    
export type NameUrl = {
    name:String;
    url:String;
}