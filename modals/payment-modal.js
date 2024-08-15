import mongoose, { Schema } from 'mongoose';

const paymentSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        amount: {
            type: String,
            required: true
        },
        transactionId: {
            type: String,
            required: true,
            unique: true
        },
        packageId: {
            type: Schema.Types.ObjectId,
            ref: 'Package',
            required: true
        },
        paymentId: {
            type: String,
            required: true,
            unique: true
        },
        merchantInvoiceNumber: {
            type: String,
            required: false,
            unique: true
        },
        paymentExecuteTime: {
            type: String,
            required: false
        },
        customerMsisdn: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
            default: 'pending'
        }
    },
    { timestamps: true }
);

const Payment = mongoose?.models?.Payment ?? mongoose.model('Payment', paymentSchema);

export default Payment;
