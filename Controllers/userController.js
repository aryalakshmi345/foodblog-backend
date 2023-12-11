const users = require('../Model/userSchema')
const jwt = require('jsonwebtoken')

// register 
exports.register = async(req,res)=>{
    console.log('Inside register controller');
    const {username,email,password} = req.body
    try{
    const existingUser = await users.findOne({email})
    if(existingUser){
        res.status(406).json("Account already exist! Please Login...")
    }else{
        const newUser = new users({
            username,email,password,profession:"",bio:"",website:"",profile:""
        })
        await newUser.save()
        res.status(200).json(newUser)

    }
    }
    catch(err){
        res.status(401).json(`Register API failed, Error: ${err}`)
    }
}

// login 
exports.login = async(req,res)=>{
    console.log("Inside login controller");
    const {email,password} = req.body
    try{
       const existingUser = await users.findOne({email,password})
       if(existingUser){
        const token = jwt.sign({userId:existingUser._id},"supersecretekey1234")
        res.status(200).json({
            existingUser,
            token
        })
       }else{
        res.status(404).json(`Incorrect email or Password`)
       }
    }catch(err){
        res.status(401).json(`Login API failed, Error: ${err}`)
    }
}

// edit profile
exports.editUser = async(req,res)=>{
    const userId = req.payload
    const {username,email,password,profession,bio,website,profile} = req.body
    const uploadImage = req.file?req.file.filename:profile
    try{
        const updateUser = await users.findByIdAndUpdate({_id:userId},{
            username,email,password,profession,bio,website,profile:uploadImage
        },{new:true})
        await updateUser.save()
        res.status(200).json(updateUser)
    }catch(err){
        res.status(401).json(`Error: ${err}`)
}
}

// get userprofile details
exports.getUserProfile = async(req,res)=>{
    const {id} = req.params
    try{
        const profileDetials = await users.findOne({_id:id})
        res.status(200).json(profileDetials)
    }
    catch(err){
        res.status(401).json(`Error: ${err}`)
}
}

