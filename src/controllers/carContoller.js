import { CarModel } from '../models/carModel.js';

export const addCar = async (req, res) => {
    const { model, price, phoneNumber, city } = req.body;
    const images = req.body.images || []

    try {
        if (!model || !price || !phoneNumber || !city) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        const imageUrls = images.map((image) => {

            if (!/^data:image\/(png|jpeg|jpg|gif);base64,/.test(image)) {
                throw new Error('Invalid Base64 image format');
            }

            return image;
        });


        const newCar = await CarModel.create({
            model,
            price,
            phoneNumber,
            city,
            images: imageUrls,
        });

        return res.status(201).json({ message: 'Car added successfully!', car: newCar });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error adding car', error: error.message });
    }
};
