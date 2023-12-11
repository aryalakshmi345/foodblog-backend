const blogs = require('../Model/blohSchema')
const users = require('../Model/userSchema')

// addblog
exports.addBlogs = async(req,res)=>{
    console.log("Inside add blog function");
    const userId = req.payload
    const blogImage = req.file.filename
    const user = await users.findOne({_id:userId})
    username = user.username
    profile = user.profile
    const {title,blogContent,cuisineType,timestamp,incredients,recipe} = req.body
    // console.log(`${title},${blogContent},${cuisineType},${blogImage},${userId},${username}`);
    try{
      const newBlog = new blogs({
        title,blogContent,cuisineType,blogImage,timestamp,userId,username,incredients,recipe,profile
      })  
      await newBlog.save()
      res.status(200).json(newBlog)
    }catch(err){
     res.status(401).json(`Request Failed Error: ${err}`)    }
}

// getuserprojects
exports.allUserBlogs = async (req,res)=>{
  const userId = req.payload
  try{
    const userBlogs = await blogs.find({userId})
    res.status(200).json(userBlogs)
  }catch(err){
    res.status(401).json(err)
  }
}

// allprojects
exports.allBlogs = async(req,res)=>{
  const searchKey = req.query.search
  const query = {
    title:{$regex:searchKey , $options:"i"}
  }
  try{
    const BlogDetails = await blogs.find(query)
    res.status(200).json(BlogDetails)
  }catch(err){
    res.status(401).json(err)
  }
}

// hethomeblogs
exports.getHomeBlogs = async(req,res)=>{
  try{
    const homeBlogs = await blogs.find().limit(4)
    res.status(200).json(homeBlogs)
  }catch(err){
    res.status(401).json(err)
  }
}

// getablog
exports.getBlogdetails = async(req,res)=>{
  const {blogId} = req.params
  // console.log(blogId);
   try{  
  const ablogDetails = await blogs.findOne({_id:blogId})
  res.status(200).json(ablogDetails)
  console.log(ablogDetails);
}catch(err){
  res.status(401).json(err)
}
}

// getuserblogs
exports.getUserBlogdetails = async(req,res)=>{
  const {id} = req.params
  // console.log(blogId);
   try{  
  const userblogDetails = await blogs.find({userId:id})
  res.status(200).json(userblogDetails)
}catch(err){
  res.status(401).json(err)
}
}

// editBlogs
exports.editBlogDetails = async(req,res)=>{
  const {id} = req.params
  const userId = req.payload
  const {title,blogContent,cuisineType,incredients,recipe,blogImage,username,timestamp} = req.body
  // console.log(`${blogContent}`);
  const uploadBlogImage = req.file?req.file.filename:blogImage
  try{
    const updateBlog = await blogs.findByIdAndUpdate({_id:id},{
      title,blogContent,cuisineType,blogImage:uploadBlogImage,timestamp,userId,username,incredients,recipe
    },{new:true})
    await updateBlog.save()
    res.status(200).json(updateBlog)
  }catch(err){
  res.status(401).json(err)
}
}

// deleteblog
exports.deleteBlogDetail = async(req,res)=>{
  const {id} = req.params
  try{
    const removeBlog = await blogs.findByIdAndDelete({_id:id})
    res.status(200).json(removeBlog)
  }catch(err){
  res.status(401).json(err)
}
}

