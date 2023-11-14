import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import bcrypt from 'bcryptjs'

/**
 * Define the quickLink schema
 */
const postSchema = new mongoose.Schema(
  {
    post: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

postSchema.plugin(mongoosePaginate)
const Post = mongoose.model("Post", postSchema);


export default Post;
