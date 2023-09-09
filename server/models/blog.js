import mongoose from "mongoose";

const Schema = mongoose.Schema;
const blogSchema = new Schema(
    {
        title: {
            type: String,
            min: 10,
            max: 120,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
        },
        public: {
            type: String,
        },
        content: {
            type: String,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        slug: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
)

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;