import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        verified: {
            type: Boolean,
            required: true,
            default: false
        },
        profilePhoto: {
            url: {
                type: String,
                required: false,
                default: ''
            },
            public_id: {
                type: String,
                required: false
            }
        },
        discount: {
            type: Number,
            required: false
        },
        role: {
            type: String,
            required: true,
            default: 'user'
        }
    },
    { timestamps: true }
);

const User = mongoose?.models?.User ?? mongoose.model('User', userSchema);

export default User;
