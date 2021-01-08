const User = require('../model/user')

exports.userById = (req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err||!user){
            return res.status(400).json({
                error:"USER not found"
            })
        }
        req.profile = user;
        next()
    })
}

exports.read =(req,res)=>{
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

exports.userByEmail = (req,res)=>{
    const { email } = req.body
    User.find({"email":email}).exec((err,user)=>{
        if(err||!user){
            return res.status(400).json({
                error:"USER not found"
            })
        }
        res.json(user)
        
    })
}

exports.update =(req,res)=>{
    console.log("ivideee")
    console.log(req.profile._id)
    User.findOneAndUpdate(
        { _id: req.profile._id},
        {$set : req.body},
        {new:true},
        (err,user)=>{
            if(err){
                return res.status(400).json({
                    error:'You are not authorised'
                })
            }
            req.profile.hashed_password = undefined
            req.profile.salt = undefined
            res.json(user)
        }
    )
}



exports.setUserFavourites = (req,res)=>{
    User.findById(req.profile._id)
        .exec((err,user)=>{
            // console.log( user.favourites.indexOf(req.product._id))
            if(user.favourites.indexOf(req.product._id) < 0){
                user.favourites.push(req.product._id)
                user.save((err,data)=>{
                    if(err){
                        return res.status(400).json({
                            error:"Fail to set favourites"
                        })
                    }
                    res.json(data)
                })
            }
            else
            {
                res.status(400).json({
                    error:"Favourite already marked"
                })
            }
            
        })
}


exports.getUserFavourites = (req,res)=>{
    User.findById(req.profile._id)
        .populate('favourites')
        .exec((err,user)=>{   
            if(err){
                return res.status(400).json({
                    error:"Fail to set favourites"
                })
            }
            res.json(user.favourites)
        })
}