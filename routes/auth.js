const express = require('express')
const router = express.Router()

const {signUp,signIn,signOut,requireSignin} = require('../controller/auth')
const {userSignupValidator} = require('../validator/index')


router.post('/auth/signup',userSignupValidator,signUp)
router.post('/auth/signin',signIn)
router.get('/auth/signout',signOut)

router.get('/hello',requireSignin,(req,res)=>{
    res.send("hello")
})

module.exports = router;