const express = require('express');
const router = express.Router();

const {userById,read,update,userByEmail} = require('../controller/user')
const {requireSignin,isAuth,isAdmin} = require('../controller/auth')


router.get('/secret/:userId',requireSignin,isAuth,isAdmin,(req,res)=>{
    res.json({user:req.profile})
})

router.get('/user/:userId',requireSignin,isAuth,read)
router.put('/user/:userId',requireSignin,isAuth,update)

router.post('/user/user-details',requireSignin,userByEmail)
router.post('/user/socialAuth',requireSignin,userByEmail)


router.param('userId',userById)

module.exports = router