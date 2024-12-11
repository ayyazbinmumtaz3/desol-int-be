import { UserModel } from "../models/index.js";
import { comparePassword, hashPassword } from "../utils/app.js";
import { generateAccessToken } from "../utils/jwt.utils.js";

export const signup = async (req, res) => {

    const { email, password, fullName } = req.body;

    try {
        const userExist = await UserModel.exists({ email });

        if (userExist) return res.status(403)
            .json({ message: "Email already exists" });

        const hashedPassword = await hashPassword(password);

        const newUser = await UserModel.create({
            email,
            password: hashedPassword,
            fullName
        })

        if (newUser) {
            return res.status(201).json({
                user: newUser,
                ...generateAccessToken(newUser.toObject(), res)
            })

        } else {
            return res.status(400).json({ message: "Invalid user data" });
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json(error);
    }

}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(409).json({ message: "User does not exist!" });
        };

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Provided password is incorrect!" });
        }

        res.status(200)
            .json({
                ...generateAccessToken(user.toObject(), res),
                message: "Login Successful",
                _id: user._id,
                fullName: user.fullName,
                email: user.email
            })

    } catch (error) {
        return res.status(500).json(error);
    }

}