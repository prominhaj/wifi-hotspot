import mongoose, { Schema } from 'mongoose';

const macAddressSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        macAddress: {
            type: String,
            required: true,
            unique: true
        }
    },
    { timestamps: true }
);

const MacAddress = mongoose?.models?.MacAddress ?? mongoose.model('MacAddress', macAddressSchema);

export default MacAddress;
