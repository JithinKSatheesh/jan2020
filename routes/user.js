const express = require('express');
const router = express.Router();

const {userById,read,update,userByEmail,setUserFavourites,getUserFavourites} = require('../controller/user')
const {productById} = require('../controller/posts')
const {requireSignin,isAuth,isAdmin} = require('../controller/auth')


router.get('/secret/:userId',requireSignin,isAuth,isAdmin,(req,res)=>{
    res.json({user:req.profile})
})

router.get('/user/:userId',requireSignin,isAuth,read)
router.put('/user/:userId',requireSignin,isAuth,update)

router.post('/user/user-details',requireSignin,userByEmail)
router.post('/user/socialAuth',requireSignin,userByEmail)

router.get('/user/:userId/posts/favourites',requireSignin,isAuth,getUserFavourites)
router.get('/user/:userId/posts/favourites/:postId',requireSignin,isAuth,setUserFavourites)

router.param('userId',userById)
router.param("postId", productById)

module.exports = router