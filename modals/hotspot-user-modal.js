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
        expiresAt: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            required: true,
            default: 'active'
        }
    },
    { timestamps: true }
);

const HotspotUser =
    mongoose?.models?.HotspotUser ?? mongoose.model('HotspotUser', hotspotUserSchema);

export default HotspotUser;
