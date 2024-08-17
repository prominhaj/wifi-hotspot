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
        packageId: {
            type: Schema.Types.ObjectId,
            ref: 'Package',
            required: true
        },
        macAddress: {
            type: String,
            required: false
        },
        hotspotProfile: {
            type: String,
            required: true
        },
        hotspotServer: {
            type: String,
            required: true
        },
        expiresAt: {
            type: Date,
            required: false
        }
    },
    { timestamps: true }
);

const HotspotUser =
    mongoose?.models?.HotspotUser ?? mongoose.model('HotspotUser', hotspotUserSchema);

export default HotspotUser;
