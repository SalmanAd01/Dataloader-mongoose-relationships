import { Arg, FieldResolver, ID, Mutation, Query, Resolver, Root } from "type-graphql";
import Post from "../../models/post";
import User from "../../models/user";
import UserType from "../typeDefs/user-type";
import PostType from "../typeDefs/post-type";

@Resolver(of => PostType)
class PostsResolvers {
    @Query(() => [PostType], { nullable: true })
    async getPosts() {
        try {
            const posts = await Post.find({});
            return posts;
        } catch (err) {
            console.log(err);
        }
    }
    @Mutation(() => PostType,{
        nullable: true
    })
    async createPost(
        @Arg("title", () => String) title: string,
        @Arg("description", () => String) description: string,
        @Arg("creator", () => ID) creator: string,
    ) {
        try {
            const post = new Post({
                title: title,
                description: description,
                creator: creator,
            });
            const savedPost = await post.save();
            const user = await User.findById(creator);
            if (user) {
                user.posts.push(savedPost);
                await user.save();
                return savedPost;
            }
            else {
                return null;
            }
        } catch (err) {
            console.log(err);
        }
    }
    @FieldResolver(() => UserType)
    async creator(@Root() parent: PostType) {
        console.log("post");
        return await User.findById(parent.creator);
    }
}
export default PostsResolvers;