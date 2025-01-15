import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

class UserController {
    static register = async (req, res, next) => {
        try {
            const { username, email, password } = req.body;
            const userNameCheck = await userModel.findOne({ username });
            if (userNameCheck) {
                return res
                    .status(400)
                    .json({
                        status: false,
                        message: "User already exists",
                    });
            }

            const emailCheck = await userModel.findOne({ email });
            if (emailCheck) {
                return res
                    .status(400)
                    .json({
                        status: false,
                        message: "Email already used",
                    });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await userModel.create({
                username,
                email,
                password: hashedPassword,
            });
            delete newUser.password;
            return res
                .status(200)
                .json({
                    status: true,
                    message: "User registered successfully",
                    newUser,
                });
        } catch (error) {
            return res
                .status(400)
                .json({
                    status: false,
                    message: error.message,  // Fixed the typo here
                });
        }
    };

    static login = async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const user = await userModel.findOne({ username });
            if (!user) {
                return res
                    .status(400)
                    .json({
                        status: false,
                        message: "Invalid credentials",
                    });
            }

            const passwordCheck = await bcrypt.compare(password, user.password);
            if (!passwordCheck) {
                return res
                    .status(400)
                    .json({
                        status: false,
                        message: "Invalid credentials",
                    });
            }

            delete user.password;

            return res
                .status(200)
                .json({
                    status: true,
                    message: "User logged in successfully",  // Fixed the typo here
                    user,
                });
        } catch (error) {
            return res
                .status(400)
                .json({
                    status: false,
                    message: error.message,  // Fixed the typo here
                });
        }
    };

    static setAvatar = async (req, res, next) => {
        try {
            const userId = req.params.id;
            const avatarImage = req.body.image;
            const userData = await userModel.findByIdAndUpdate(userId, {
                isAvatarImageSet: true,
                avatarImage,
            });
            return res
                .status(200)
                .json({
                    isSet: userData.isAvatarImageSet,
                    image: userData.avatarImage,
                });
        } catch (error) {
            next(error);
        }
    };

    static getAllUsers = async (req, res, next) => {
        try {
            const users = await userModel.find({ _id: { $ne: req.params.id } }).select("email username avatarImage _id");
            return res
                .status(200)
                .json(users);
        } catch (error) {
            next(error);
        }
    };
}

export default UserController;
