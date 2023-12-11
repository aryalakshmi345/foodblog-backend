const express = require('express')
const router = new express.Router()
const userController = require('../Controllers/userController')
const blogController = require('../Controllers/blogController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddileware')

// regsiter
router.post('/user/register',userController.register)
// login
router.post('/user/login',userController.login)
// addblog
router.post('/blog/add',jwtMiddleware,multerConfig.single('blogImage'),blogController.addBlogs)
// alluserblogs
router.get('/user/all-blogs',jwtMiddleware,blogController.allUserBlogs)
// allBlogs
router.get('/blogs/all-blogs',jwtMiddleware,blogController.allBlogs)
// homeBlogs
router.get('/blogs/home-blogs',blogController.getHomeBlogs)
// getablog
router.get('/blogs/view/:blogId',blogController.getBlogdetails)
// getuserprodile
router.get('/user/view/:id',userController.getUserProfile)
// getuserprodile
router.get('/user/blogs/:id',blogController.getUserBlogdetails)
// edit
router.put('/blogs/edit/:id',jwtMiddleware,multerConfig.single('blogImage'),blogController.editBlogDetails)
// delete blog
router.delete('/blogs/remove/:id',jwtMiddleware,blogController.deleteBlogDetail)
// edit user
router.put('/user/edit',jwtMiddleware,multerConfig.single('profile'),userController.editUser)




// export router
module.exports = router