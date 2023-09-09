import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const userSchema = new Schema(
    {
        username: {
            type: String,
            min: 6,
            max: 20,
            unique: false,
            required: true,
        },
        password: {
            type: String,
            min: 6,
            max: 20,
            unique: false,
            required: true,
        },
        slug: {
            type: String,
            unique: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);

export default User;