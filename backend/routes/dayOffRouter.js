
const express =  require('express');
const daysOffSchema = require('../models/dayOff');
const daysoffRouter= express.Router();
const {addDaysOff,getDaysOff,getDaysOffId,daysOffDecision, updateDaysOff, deleteDayOff,deleteAllDaysOff} = require('../controllers/dayOffController');
const isAuth = require('../middleware/authentication');
const {checkRole} = require('../middleware/role');
const {validatorId} = require ('../middleware/validatorId');
const {validateDayoff,validateDesicion} = require ('../middleware/validatorReq')

// add daysOff
daysoffRouter.post('/daysOff', isAuth,(req, res, next)=> checkRole(['Super Admin','Director', 'Administration Director', 'Administration Assistant', 'Team manager', 'Software Engineer'], req, res, next),validateDayoff,addDaysOff);


// info all dayoff
daysoffRouter.get('/daysOff', isAuth,(req, res, next)=> checkRole(['Super Admin','Director', 'Administration Director', 'Administration Assistant', 'Team manager', 'Software Engineer'], req, res, next) , getDaysOff );

// Route for delete all request of days off
daysoffRouter.delete("/daysOff", isAuth,(req, res, next)=> checkRole(['Super Admin','Director', 'Administration Director', 'Administration Assistant', 'Team Manager', 'Software Engineer'], req, res, next),deleteAllDaysOff);
// inf for one dayoff
daysoffRouter.get('/daysOff/:id', isAuth,(req, res, next)=> checkRole(['Super Admin','Director', 'Administration Director', 'Administration Assistant', 'Team manager', 'Software Engineer'], req, res, next),validatorId, getDaysOffId );

//Update request (all user)
daysoffRouter.put('/daysOff/:id', isAuth,(req, res, next)=> checkRole(['Super Admin','Director', 'Administration Director', 'Administration Assistant', 'Team manager', 'Software Engineer'], req, res, next),validatorId,updateDaysOff)

//delete 
daysoffRouter.delete('/daysOff/:id', isAuth,(req, res, next)=> checkRole(['Super Admin','Director', 'Administration Director', 'Administration Assistant', 'Team manager', 'Software Engineer'], req, res, next),validatorId,deleteDayOff);

//decision
 daysoffRouter.patch('/daysOff/decision/:id', isAuth,(req, res, next)=> 
 checkRole(['Director','Team manager'], req, res, next),validatorId,validateDesicion,daysOffDecision)

//daysoffRouter.patch('/daysOff/decision/:id', isAuth,validatorId,daysOffDecision)





module.exports= daysoffRouter;