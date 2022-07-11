import {Field, ID, ObjectType} from "type-graphql"
import  {SocialMediaDocument,PostDocument} from "../../@types";
import SocialMediaType from "./socialmedia-type";
import PostType from "./post-type";

@ObjectType({description: "User type"})
class User{
    @Field(()=>ID)
    readonly _id: string;
    @Field(()=>String)
    name: string;
    @Field(()=>String)
    email: string;
    @Field(()=>String)
    password: string;
    @Field(() => SocialMediaType,{
        nullable: true
    })
    socialMedia: SocialMediaDocument;
    @Field(() => [PostType] ,{
        // nullable: "itemsAndList",
        nullable: true

    })
    posts: PostDocument[];

}
export default User;