import SocialMedia from "../../models/socialmedia";
import { Arg, Field, FieldResolver, ID, InputType, Mutation, Query, Resolver, Root } from "type-graphql";
import User from "../../models/user";
import SocialMediaType from "../typeDefs/socialmedia-type";
import UserType from "../typeDefs/user-type";
@InputType()
class SocialMediaInput {
    @Field(() => String, { nullable: false })
    name!: string;
    @Field(() => String, { nullable: false })
    url!: string;
}
@Resolver(of => SocialMediaType)
class SocialMediasResolvers {
    @Query(() => [SocialMediaType], { nullable: true })
    async getSocialMedias() {
        try {
            const socialMedias = await SocialMedia.find({});

            return socialMedias;
        } catch (err) {
            console.log(err);
        }
    }
    @Mutation(() => SocialMediaType,{
        nullable:true
    })
    async createSocialMedia(
        @Arg("socialMediaInput", () => [SocialMediaInput]) socialMediaInput: [SocialMediaInput],
        @Arg("belongsTo", () => ID) belongsTo: string,
    ) {
        try {
            const socialMedia = new SocialMedia({
                media: socialMediaInput,
                belongsTo: belongsTo,
            });
            const updateusersocialmedia = await User.findByIdAndUpdate(
                belongsTo,
                {
                    socialMedia: socialMedia._id,
                }
            );

            const savedSocialMedia = await socialMedia.save();
            return savedSocialMedia;
        } catch (err) {
            console.log(err);
        }
    }

    @FieldResolver(() => [UserType])
    async belongsTo(@Root() parent: SocialMediaType) {
        console.log("socialmedia");
        return await User.findById(parent.belongsTo);

    }
}
export default SocialMediasResolvers;