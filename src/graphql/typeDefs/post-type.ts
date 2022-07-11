import { Field, ID, ObjectType } from "type-graphql"
import { UserDocument } from "../../@types";
import UserType from "./user-type";
@ObjectType({ description: "Post type" })
class Post {
    @Field(type => ID, { nullable: false })
    readonly _id!: String;
    @Field(type => String, { nullable: false })
    title!: String;
    @Field(type => String, { nullable: false })
    description!: String;
    @Field(type => UserType, { nullable: false })
    creator!: UserDocument;
}
export default Post;