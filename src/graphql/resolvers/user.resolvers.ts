import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import Post from "../../models/post";
import SocialMedia from "../../models/socialmedia";
import User from "../../models/user";
import UserType from "../typeDefs/user-type";
import SocialMediaType from "../typeDefs/socialmedia-type";
import PostType from "../typeDefs/post-type";
@Resolver(of => UserType)
class UserResolver {
    @Query(() => [UserType] ,{nullable:true})
    async getUsers() {
        console.log("getusers");
        try {
            const users = await User.find({});
            return users;
        } catch (err) {
            console.log(err);
        }
    }

    @Mutation(() => UserType,{nullable:true})
    async createUser(
        @Arg("name",()=>String) name: string,
        @Arg("email",()=>String) email: string,
        @Arg("password",()=>String) password: string,
    ) {
        try {
            const user = new User({
                name: name,
                email: email,
                password: password,
            });
            const savedUser = await user.save();
            return savedUser;
        } catch (err) {
            console.log(err);
        }
    }

    @FieldResolver(() => [SocialMediaType])
    async socialMedia(@Root() parent: UserType) {
        console.log("usersm");
        return await SocialMedia.findById(parent.socialMedia);
    }

    @FieldResolver(() => [PostType])
    async posts(@Root() parent: UserType) {
        console.log("userposts");
        return await Post.find({ creator: parent._id });
    }

}
export default UserResolver;