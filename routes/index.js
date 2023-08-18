const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const {dbUrl} = require('../config/dbConfig')
const {UserModel} = require('../schma/UserSchema')

mongoose.connect(dbUrl)

// router.get('/', (req, res)=>{
//     res.send('<h1>Welcome to express</h1>')
// })

router.get('/', async (req, res)=>{
    try {
        let users = await UserModel.find()
        res
        .status(200)
        .send({
            message: 'Data fetched succfully',
            users
        })
    } catch (error) {
        res
        .status(500)
        .send({
            message: 'Internal server error'
        })
    }
})

router.get('/:id', async (req, res)=>{
    
    try {
        let data = await UserModel.findById(req.params.id)
        if(data) {
        res.status(200).send({
            message: 'Data fetched succfully in id',
            data
        })
    }else {
        res.status(400).send({message: 'Invalid ID'})
    }
    } catch (error) {
        console.log(error)
        res
        .status(500)
        .send({
            message: 'Internal server error'
        })
    }
})

router.post('/', async (req, res)=>{
    
    try {
       let user = await UserModel.findOne({email:req.body.email})
       if(!user) {
        let newUser = await UserModel.create(req.body)
        res.status(200).send({message:"User Created Successfully"})
       }else {
        res.status(400).send({message:`User with ${req.body.email} already exists`})
       }
    } catch (error) {
        res
        .status(500)
        .send({
            message: 'Internal server error',
            error: error?.message
        })
    }
})

router.put('/:id', async (req, res)=>{
    try {
        let user = await UserModel.findById(req.params.id)
        if (user) {
            user.name = req.body.name
            user.email = req.body.email
            user.password = req.body.password
            await user.save()
        }else {
            res.status(400).send({
                message: "Invalid User Id",
                error:error?.message
            })
        }
    
    } catch (error) {
        res.status(500).send({
            message:'Internal server error',
            error:error?.message
            
        })
    }
})

router.delete('/:id', async (req, res)=>{
    try {
        let user = await UserModel.findByIdAndDelete(req.params.id)
        if(user) {
            res.status(200).send({
                message: "User Deleted Successfully"
            })
        }else {
            res.status(400).send({message:"Invalid user ID"})
        }
    
    } catch (error) {
        console.log(error)
        res
        .status(500)
        .send({
            message: 'Internal server error'
        })
    }
})

module.exports = router