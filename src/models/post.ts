import mongoose from "mongoose";
import { PostDocument } from "../@types";
const schema = mongoose.Schema;

const postSchema = new schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}) 

const Post = mongoose.model<PostDocument>("Post", postSchema);
export default  Post;