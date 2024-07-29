const User = require("../model/User")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.json('The user does not exist');
            return;
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const userData = {
                name: user.name,
                email: user.email,
              };
              res.json(userData);
        } else {
            res.status(401).json('Incorrect');
        }
        // const token = jwt.sign(
        //     {id: user._id}, process.env.JWT_SECRET,{expiresIn: "3h"}
        // )
        // user.token = token
        // user.password = undefined

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json('Error during login');
    }
}

exports.signup = async (req, res) => {
    const { name, lname, email, password } = req.body;
    try {
        const existingUser = await User.findOne(
         { email: email }
        );
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name: name,
            lname: lname,
            email: email,
            password: hashedPassword,
        });
        newUser.save()
            .then(
            res.json({
                msg: "Successfully Registered"
            })
            )
            .catch((err) => console.log(err));
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}