const express =  require('express');
const userRouter = express.Router();
const UserSchema = require('../models/user');
const {addUser,Login,forgetPassword,resetPassword,getList,getUserById,updateInformation,disable, deleteUser} = 
require('../controllers/userController');
const isAuth = require('../middleware/authentication');
const {checkRole} = require('../middleware/role');
const {validatorId} = require ('../middleware/validatorId');
const {validateRequest} = require('../middleware/validatorReq');
const photoUpload = require('../middleware/photoUpload');

//login
userRouter.post('/auth/login',Login)
//forget password
userRouter.post('/auth/forgotPassword',forgetPassword )

//reset password
userRouter.patch('/auth/requestResetPassword',resetPassword )

//log 
//userRouter.patch('/auth/requestResetPassword',resetPassword )

//added a new user
userRouter.post('/users',isAuth,(req, res, next)=> checkRole(['Super Admin'], req, res, next),validateRequest,addUser)
//userRouter.post('/users',validateRequest,addUser)

//inf all user
userRouter.get('/users',isAuth,(req, res, next)=> checkRole(['Super Admin'], req, res, next),getList)
//userRouter.get('/users',getList)

//inf user
userRouter.get('/users/:id',isAuth,(req, res, next)=> checkRole(['Super Admin','Director', 'Administration Director', 'Administration Assistant', 'Team manager', 'Software Engineer'], req, res, next),validatorId,getUserById)
//userRouter.get('/users/:id',validatorId,getUserById)

//Update request (all user)
userRouter.put('/users/:id', isAuth,(req, res, next)=> checkRole(['Super Admin','Director', 'Administration Director', 'Administration Assistant', 'Team manager', 'Software Engineer'], req, res, next),validatorId, updateInformation);

//delete
userRouter.delete('/users/:id',isAuth,(req, res, next)=> checkRole(['Super Admin'], req, res, next),validatorId,deleteUser);

//Disable User
userRouter.patch('/users/toggle-enable/:id',isAuth,(req, res, next)=> checkRole(['Super Admin'], req, res, next), validatorId,disable );

module.exports= userRouter;