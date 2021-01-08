const User = require('../model/user')
const { errorHandler } = require('../helpers/dbErrorHandler')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
require('dotenv').config()
const jwt_secret_key = "helloworld"


exports.signUp = (req, res) => {
    console.log("body :", req.body)
    const user = new User(req.body)
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        user.salt = undefined
        user.hashed_password = undefined
        res.json(
            user
        )

    })
}

exports.signIn = (req, res) => {
    const { email, password } = req.body
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User doesn't exist . Please try again!"
            })
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Password and userid doesn't match!"
            })
        }
        const token = jwt.sign({ _id: user._id }, jwt_secret_key);
        res.cookie("t", token, { expire: new Date() + 9999 })
        const { _id, email, username, role ,address,dp} = user
        return res.json(({ token, user: { _id, email, username ,address,dp} }))
    })
}

exports.signOut = (req, res) => {
    res.clearCookie('t');
    res.json({ message: "Signout successfull" })
}


exports.requireSignin = expressJwt({ 
    secret:  jwt_secret_key, 
    requestProperty: 'auth', 
    algorithms: ['HS256'] });

exports.isAuth = (req,res,next)=>{
    let user = req.profile && req.auth && req.profile._id == req.auth._id
    if(!user){
        return res.status(403).json({
            error:"Access denied"
        })
    }
    next()
}

exports.isAdmin = (req,res,next)=>{
    if(req.profile.role === 0){
        return res.status(403).json({
            error:"Admin resource! Access denied."
        })
    }
    return next()
}