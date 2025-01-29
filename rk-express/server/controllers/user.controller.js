import expressAsyncHandler from "express-async-handler";
import { User } from "../models/UserModel.js";
import { userGenerateToken } from "../middlewares/UserProtect.js";

export const createUser = expressAsyncHandler(async (req, res) => {
    const { name, userName, email, password, role } = req.body;
    // sending everything in body and in plaintext
    try {
        // saving this as plaintext
        const user = new User({ name, userName, email, password, role });

        // now we call save method on the user object , password is automatically hashed and stored.
        const createdUser = await user.save();

        res.status(201).json(createdUser);
        // response will not have password as it is removed in the toJSON method of the user model.

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

// login request controller function
export const loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        //first check if email exists
        const user = await User.findOne({ email });

        const cookieArgs = {
            httpOnly: false,
            secure: true,
            sameSite: "none",
            maxAge: 2 * 60 * 60 * 1000, // 2 hours
        };

        if (user) {
            //use schema method comparePassword to compare password

            if ((await user.comparePassword(password))) {
                // create token (JWT) and send it to the user
                const token = userGenerateToken(user._id);
                //this is a server side cookie this is not going to be accessible by the client application
                //this is a secure way to store the token
                res.cookie("accessToken", token, cookieArgs);

                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    //token added here needs to be managed mannually by the client app
                    // for bearer token authentication. needs to be added to authorization header
                    token: token,
                });
            }
            else {
                res.status(401).json({ message: "Invalid password" });
            }
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
})

export const getUserProfile = expressAsyncHandler(async (req, res) => {
    const user = req.user;
    res.json(user);
});