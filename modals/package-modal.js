import mongoose, { Schema } from 'mongoose';

const packageSchema = new Schema(
    {
        packageName: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
        profileName: {
            type: String,
            required: true
        },
        hotspotServer: {
            type: String
        },
        hotspotProfileId: {
            type: String,
            required: true
        },
        validity: {
            type: Number,
            required: true,
            default: 0
        },
        speedLimit: {
            type: String,
            required: true,
            default: ''
        }
    },
    { timestamps: true }
);

const Package = mongoose?.models?.Package ?? mongoose.model('Package', packageSchema);

export default Package;
