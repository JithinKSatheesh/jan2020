const Product = require('../model/posts')
const formidable = require('formidable')
// const fs = require('fs')
// const _ = require('lodash')
// const { result } = require('lodash')
const { errorHandler } = require('../helpers/dbErrorHandler')
// const product = require('../model/product')



exports.productById = (req,res,next,id)=>{
    Product.findById(id)
    .populate('user')
    .exec((err,product)=>{
        if(err||!product){
            return res.json({
                error:"Post not found"
            })
        }
        req.product = product
        next()
    })
}

exports.read = (req,res)=>{
    // req.product.photo = undefined
    return res.json(req.product)
}

exports.remove = (req,res)=>{
    let product =  req.product
    product.remove((err,deletedProduct)=>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json({
            "message":"Post deleted successfully"
        })
    })
}

exports.update =(req,res)=>{
    Product.findOneAndUpdate(
        { _id: req.product._id},
        {$set : req.body},
        {new:true},
        (err,post)=>{
            if(err){
                return res.status(400).json({
                    error:'Error in updating'
                })
            }
            
            res.json(post)
        }
    )
}

exports.create = (req,res)=>{
    console.log("here")
    const fields = req.body
    const {title,description,price,category,contactPerson,email,contactNumber} = fields
    // if(!title||!description||!price||!category||!contactPerson||!email,contactNumber){
        //     return res.status(400).json({
            //         error:"All field are required!"
            //     })
            // }
            
    let product = new Product(fields)
    product.user = req.profile._id
    console.log(product)
    product.save((err,result)=>{
        if(err){
            console.log(err)
            return res.status(400).json({
                error:"fail to create"
            })
        }
        res.json(result)
    })
}

// ============


exports.list = (req,res)=>{
    let order = req.query.order?req.query.order: 'asc'
    let sortBy = req.query.sortBy?req.query.sortBy: '_id'
    let limit = req.query.limit?parseInt(req.query.limit): 6

    Product.find()
        // .select("-photo")
        .populate('user')
        .sort([[sortBy,order]])
        .limit(limit)
        .exec((err,products)=>{
            if(err){
                return res.status(400).json({
                    error:'Post not found'
                })
            }
            res.send(products)
        })
}



exports.getUserPosts = (req,res)=>{
    Product.find({user:req.profile._id})
    .populate('user')
    .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error:'Post not found'
            })
        }
        res.send(products)
    })
}















// exports.listRelated = (req,res)=>{
//     let limit = req.query.limit?parseInt(req.query.limit): 6
//     Product.find({'_id':{$ne:req.product},category : req.product.category})
//         .limit(limit)
//         .populate("category","_id name")
//         .exec((err,products)=>{
//             if(err){
//                 return res.status(400).json({
//                     error:"product not found"
//                 })
//             }
//             res.json(products)
//         })
 
// }

// exports.listCategories = (req,res)=>{
//     Product.distinct("category",{},(err,categories)=>{
//         if(err){
//             return res.status(400).json({
//                 error:"categories not found"
//             })
//         }
//         res.json(categories)
//     })
// }

// exports.listBySearch =(req,res)=>{
//     let order = req.query.order?req.query.order: 'asc'
//     let sortBy = req.query.sortBy?req.query.sortBy: '_id'
//     let limit = req.query.limit?parseInt(req.query.limit): 100
//     let skip = parseInt(req.body.skip)
//     let findArgs = {}

//     for(let key in req.body.filters){
//         if(req.body.filters[key].length > 0){
//             if(key === "price"){
//                 findArgs[key] = {
//                     $gte:req.body.filters[key][0],
//                     $lte:req.body.filters[key][1]
//                 }
//             }else{
//                 findArgs[key] = req.body.filters[key]
//             }
//         }
//     }

//     Product.find(findArgs)
//         .select("-photo")
//         .populate('category')
//         .sort([[sortBy,order]])
//         .skip(skip)
//         .limit(limit)
//         .sort([[sortBy, order]])
//         .exec((err,data)=>{
//             if(err){
//                 return res.status(400).send(err)
//             }
//             res.json({
//                 size:data.length,
//                 data
//             })
//         })
// }

// exports.photo =(req,res,next)=>{
//     if(req.product.photo.data){
//         res.set('Content-Type',req.product.photo.contentType)
//         return res.send(req.product.photo.data)
//     }
//     next()

// }