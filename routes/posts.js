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
    getUserPosts
    // listRelated, 
    // listCategories, 
    // listBySearch,
    // photo

    } = require('../controller/posts')

router.get('/posts', list)
router.get('/posts/:postId', read)
router.get('/posts/user/:userId',getUserPosts)
router.post('/post/create/:userId', requireSignin, isAuth, create)
// router.get('/posts/user/favourites/:userId',getUserFavourites)

router.delete('/post/:postId/:userId', requireSignin, isAuth, remove)
router.put('/post/:postId/:userId', requireSignin, isAuth, update)

// router.get('/posts/categories', listCategories)
// router.get('/post/related/:postId', listRelated)
// router.post('/posts/by/search', listBySearch)
// router.get('/post/photo/:postId', photo)


router.param("userId", userById)
router.param("postId", productById)

module.exports = router