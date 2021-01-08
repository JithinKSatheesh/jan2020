const express = require('express')
const router = express.Router()

const { isAdmin, requireSignin, isAuth } = require('../controller/auth')
const { userById } = require('../controller/user')
const { 
    create, 
    read, 
    remove, 
    update, 
    productById, 
    list, 
    listAll,
    getUserPosts

    } = require('../controller/posts')

router.get('/posts', listAll)
router.get('/posts/notmine/:userId', list)  //list posts except user post
router.get('/posts/user/:userId',getUserPosts)


// route contain 'post' without 's'

router.get('/post/view/:postId', read)
router.post('/post/create/:userId', requireSignin, isAuth, create)
router.delete('/post/:postId/:userId', requireSignin, isAuth, remove)
router.put('/post/:postId/:userId', requireSignin, isAuth, update)


router.param("userId", userById)
router.param("postId", productById)

module.exports = router