const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require("../services/nodeMailer");

const createUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        if (!name || !email || !password || !phone) {
            return res.status(400).json({
                status: "FAILED",
                message: "All fields required!"
            });
        }

        // Check if user is already registered
        const checkUser = await userModel.findOne({ email });
        if (checkUser) {
            return res.status(400).json({
                status: "FAILED",
                message: "User already registered!"
            });
        }

        const user = new userModel()

        user.name = name
        user.email = email
        await user.setPassword(password)
        user.phone = phone

        await user.save();
        console.log(user);
        const token = await jwt.sign(
            { userId: user._id },
            process.env.SECRET_KEY,
            { expiresIn: '10m' }
        );

        const verificationLink = `http://localhost:${process.env.PORT}/api/user/verify/${user._id}/${token}`;
        const mailContent = {
            subject: 'Email Verification | CodeWithAsh',
            text: 'Please verify your email address with the link below.',
            content: `
                    <h2>Greetings of the day!</h2>
                    <p><b>Dear ${user.name}, </br> Please verify your email address by clicking <a href='${verificationLink}'>here</a>.</b></p>
                    <p><strong>Caution:</strong> Please do not share this email with anyone for security reasons. This link is unique to your account and should not be shared.</p>
                    <p>If you did not register for an account with us, please ignore this email.</p>
                    <p><h3>Thanks,</h3><h3>Team CWA</h3></p>
                `
        };
        const checkMail = await sendEmail(user.email, mailContent);
        return res.status(201).json({
            verificationLink,
            user: user._doc,
        });

    } catch (error) {
        return res.status(500).json('Internal Server Error: ' + error);
    }
};

const verifyUser = async (req, res) => {
    try {
        const { _id, token } = req.params;
        const { userId } = await jwt.verify(token, process.env.SECRET_KEY);
        if (userId === _id) {
            //if user is already verified
            const user = await userModel.findById(_id);
            if (user.isVerified) {
                return res.status(400).json({
                    status: "FAILED",
                    message: "User already verified"
                });
            }
            user.isVerified = true
            await user.save();
            return res.status(200).json({
                status: "SUCCESS",
                message: "User verified successfully",
            });
        }
        return res.status(400).json({
            status: "FAILED",
            message: "Invalid token or ID"
        });
    } catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: error.message
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        if (!email || !password) {
            return res.status(400).json({
                status: "FAILED",
                message: "Email and password required!"
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                status: "FAILED",
                message: "User not found"
            });
        }

        const passwordCheck = await user.isPasswordValid(password)
        if (!passwordCheck) {
            return res.status(400).json({
                status: "FAILED",
                message: "Password incorrect!"
            });
        }

        if (!user.isVerified) {
            return res.status(400).json({
                status: "FAILED",
                message: "User not verified"
            });
        }

        const token = jwt.sign({
            uid: user._id,
            email: user.email
        }, process.env.SECRET_KEY, { expiresIn: '7d' });

        // Set token as a cookie
        res.cookie('token', token, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true }).status(200).json({
            status: 'SUCCESSFULL',
            token: token
        });

        // Alternatively, you can send the token in the response body
        // res.json({ token });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = loginUser;

module.exports = { createUser, verifyUser, loginUser };