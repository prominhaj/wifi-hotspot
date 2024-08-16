import mongoose, { Schema } from 'mongoose';

const hotspotUserSchema = new Schema(
    {
        hotspotUserId: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        paymentId: {
            type: Schema.Types.ObjectId,
            ref: 'Payment',
            required: true
        },
        macAddress: {
            type: String,
            required: false,
            unique: true
        },
        hotspotProfile: {
            type: String,
            required: true
        },
        hotspotSever: {
            type: String,
            required: true
        },
        expiresAt: {
            type: String,
            required: false
        }
    },
    { timestamps: true }
);

const HotspotUser =
    mongoose?.models?.HotspotUser ?? mongoose.model('HotspotUser', hotspotUserSchema);

export default HotspotUser;
