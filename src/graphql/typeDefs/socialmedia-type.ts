import {Field, ID, ObjectType} from "type-graphql"
import { NameUrl, UserDocument } from "../../@types";
import nameurlType from "./nameurl-type";
import UserType from "./user-type";

@ObjectType({description: "SocialMedia type"})
class SocialMedia {
    @Field(type => ID, { nullable: false })
    readonly _id!: String;
    @Field(type => [nameurlType], { nullable: false })
    media!: NameUrl[];
    @Field(type => UserType, { nullable: false })
    belongsTo!: UserDocument;
}
export default SocialMedia;