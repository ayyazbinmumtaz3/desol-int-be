import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
    {
        model: { type: String, required: true, minlength: 3 },
        price: { type: Number, required: true, minlength: 0 },
        phoneNumber: { type: String, required: true, length: 11 },
        city: { type: String, required: true },
        images: [{ type: String }],
    },
    { timestamps: true }
);

export const CarModel = mongoose.model('Car', carSchema);
