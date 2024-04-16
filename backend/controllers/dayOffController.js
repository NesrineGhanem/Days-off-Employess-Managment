
const daysOffSchema = require('../models/dayOff');
const UserSchema = require('../models/user');
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs')


//add dayoff
exports.addDaysOff=async(req,res)=>{
    const token = req.headers.authorization.split(' ')[1]; 
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); 
    const userId = decodedToken.userId
    try{
       
        let newDaysOff = new daysOffSchema({
            userId:userId,
            startDay:req.body.startDay,
            endDay:req.body.endDay,
            type:req.body.type,
            justificationSick: req.body.justificationSick
        }); 
        let startDay = dayjs(newDaysOff.startDay)
        let endDay = dayjs(newDaysOff.endDay)
        let reqDay = endDay.diff(startDay, 'days')
        if(reqDay > process.env.maxDaysByMonth) {
            return res.status(201).send({ message : "maximum 10 days"})
        }
        newDaysOff.reqDayOff = reqDay
        await newDaysOff.save();
        return res.status(200).send({ message: `your request is succussffully added and the id of it ${newDaysOff._id} ` });
    }
    catch (err) {
        res.status(400).send({ error: `error adding new Days Off ${err}` })
        }
};


//get info all request day off
exports.getDaysOff = async(req,res)=>{
    let { page, limit, sortBy,createdAt, createdAtBefore, createdAtAfter } = req.query
    if(!page) page=1
    if(!limit) limit=30

    const skip=(page-1)*limit
    const daysOffList= await daysOffSchema.find()
                        .sort({ [sortBy]: createdAt })
                        .skip(skip)
                        .limit(limit)
                        .where('createdAt').lt(createdAtBefore).gt(createdAtAfter)
    const count= await daysOffSchema.count() //estimatedDocumentCount() or countDocuments()
                        
  res.send({page:page,limit:limit,totalItems:count,daysOffList:daysOffList})
   
   } ;
   

//get info one request day off
exports.getDaysOffId=async(req,res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userReqId = decodedToken.userId;
    const verifyUser = daysOffSchema.userId = userReqId
    daysOffSchema.find({ userId: verifyUser }, (err, result) => {
        if (!err) {
            res.status(201).json(result);
        } else return res.status(400).json({ message: 'Bad request' })
    });
}


// update request day off
exports.updateDaysOff=async (req, res) => {
    if(!req.body){
        return res.status(400).send({message:`Day off can not update, be empty!`})
    }
    const {id} = req.params;
    daysOffSchema.findOne({_id: id})
    .then(dayoff => {
        if(!dayoff){ 
            return res.status(401).json({ error: 'Request not found !' }); } 

        if(dayoff.statusDecision === true){
            res.status(401).json({error:`you can't update this request`})}    
        });

    try {
            const daysOffs = await daysOffSchema.findByIdAndUpdate(req.params.id,req.body );   
            let startDay = dayjs(daysOffs.startDay)
            let endDay = dayjs(daysOffs.endDay)
            let reqDay = endDay.diff(startDay, 'days')
            if(reqDay > process.env.maxDaysByMonth) {
                return res.status(201).send({ message : "maximum 10 days"})
            }
            daysOffs.reqDayOff = reqDay
            await daysOffs.save()
            res.status(200).send({ message: `${daysOffs.id} is succussffully updated` });
         }
    catch (error) {
        res.status(500).json({err:`err`}); 
    }
    
}

//delete request day off
//   exports.deleteDayOff=async(req,res)=>{
    
//         const { id } = req.params;
//         try {
//             const dayoff = await daysOffSchema.findOne({ _id: id })
//             if (!dayoff) {
//                 return res.status(404).json({ error: 'Request not found or you are disabled now! ' })
//             }
    
//             else if (dayoff.statusDecision && !dayoff.statusReq ) return res.status(400).json({ error:'you can not remove this request!' })
//             else if ( dayoff.statusDecision && dayoff.statusReq || !dayoff.statusDecision ) {
    
//                 await daysOff.findByIdAndDelete({ _id: id })
//                     .then(() => {
//                         return res.status(200).json({ message: " The Request are succussffully deleted" })
//                     })
    
//             }
//         }
//         catch (err) {
//             res.status(500).json({ err: "error deleting!" })
//         }
    
//   };

  // Delete one request
  exports.deleteDayOff = async (req, res) => {
    const { id } = req.params;
    try {
        const dayoff = await daysOffSchema.findOne({ _id: id })
        if (!dayoff) {
            return res.status(404).json({ error: "Request not found or you are disabled now! " })
        }
        else if (!dayoff.statusDecision || dayoff.statusDecision && dayoff.statusReq != null) {
            await daysOffSchema.findByIdAndDelete({ _id: id })
                .then(() => {
                    return res.status(200).json({ message: " The Request are succussffully deleted" })
                })
        }
        else if (dayoff.statusDecision) return res.status(400).json({ error: "you can not remove this request!" })
    }
    catch (err) {
        res.status(500).json({ err: "error deleting!" })
    }
};

  // Delete all request
//   exports. deleteAllDaysOff = async (req, res) => {
//     try {
//         const token = req.headers.authorization.split(' ')[1];
//         const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); 
//         const userReqId = decodedToken.userId;
//         const verifyUser = daysOffSchema.userId = userReqId
//         const dayoff = daysOffSchema.find({ userId: verifyUser })
//         if (!dayoff) {
//             return res.status(404).json({ error: `Requests not found or you are disabled now! ` })
//         }
//         if (dayoff.statusDecision === true) {
//             return res.status(401).json({ error: "you can not remove all request!" })
//         }
//         else {
//             await daysOffSchema.deleteMany(dayoff)
//         }
//         return res.status(200).send({ message: " All daysOff are succussffully deleted" })
//     }
//     catch (err) {
//         res.status(500).json({ message: "error deleting!" })
//     }
// };

  // Delete all request

  exports. deleteAllDaysOff  = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userReqId = decodedToken.userId;
        const verifyUser = daysOffSchema.userId = userReqId
        const dayoff = await daysOffSchema.find({ userId: verifyUser })
        if (!dayoff) {
            return res.status(404).json({ error: "Requests not found or you are disabled now!"  })
        }
        const statusDec = dayoff.map((statusDec) => statusDec.statusDecision);
        const statusReq = dayoff.map((statusReq) => statusReq.statusReq);        
        const decision = true
        if( ! statusDec.includes(decision)) {
            await daysOffSchema.deleteMany({ userId: verifyUser })
            return res.status(200).json({ message: " All Request are succussffully deleted" })
           
        }
        else if(statusDec.includes(decision) ) {
            if(statusReq.includes(null) ) return res.status(400).json({  message: 'Can not delete all request' })
            else {
                await daysOffSchema.deleteMany({ userId: verifyUser })
                return res.status(200).json({ message: " All Request are succussffully deleted" })
            }
            
        }
    }
    catch (err) {
        return res.status(500).json({ message: "error deleting!" })
    }
};
//decision manager || directer
// exports.daysOffDecision = async (req, res, next) => {
//     const { id } = req.params
//     const idReq = await daysOffSchema.findOne({_id: id})
//     if(!idReq) {
//         return res.json({error: 'Request not found'})
//     }

//     try {
//         const token = req.headers.authorization.split(' ')[1]; 
//         const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); 
//         console.log(decodedToken.role)
//         const userId = decodedToken.userId; 
//         if(decodedToken.role === "Team manager"){
//             await daysOffSchema.findByIdAndUpdate(
//                 {_id: id},
//                 {$set : {
//                     "decisionManager .userIdMan": userId,
//                     "decisionManager.status": req.body.status,
//                     "decisionManager.justification": req.body.justification

//                 }}    
//             )}
//         if(decodedToken.role === "Director"){
//             await daysOffSchema.findByIdAndUpdate(
//                 {_id: id},
//                 {$set : {
//                     "decisionDirector.userIdDir": userId,
//                     "decisionDirector.status": req.body.status,
//                     "decisionDirector.justification": req.body.justification
//                     }}
//                 )}

//         await daysOffSchema.findByIdAndUpdate(
//             {_id:id},
//             {$set :{"statusDecision":true}}
//          )
        
         
         
//         res.status(200).send(`user with id = ${userId} ,your answer is succussffully send`);
//         next()
//     }catch (err) {
//         res.status(400).send( `error adding new Days Off ${err}` )
//     }
//     }
//     //the status of request Accepted or Declined
// exports. statusReq = async ( req, res) => {
//     const { id } = req.params
//     const idReq = await daysOff.findOne({_id: id})
//     const idUser = idReq.userId
//     let user = await UserSchema.findOne({_id: idUser})
//     let oldSoldDays = user.soldeDays
//     let statusMan = idReq.decisionManager.Status
//     let statusDir = idReq.decisionDirector.Status
//     let reqDays = idReq.reqDayOff
//     let oldSoldSick = user.daysOffSick
//     if(statusDir && statusMan === true){
//         await daysOff.findByIdAndUpdate(
//             {_id: id}, 
//             {$set : {
//                 "statusReq" : true
//             }}
//         )
//         if(idReq.justificationSick != null && user.daysOffSick < process.env.soldDaysOffSick) {
//             await daysOff.findByIdAndUpdate(
//                 {_id: id}, 
//                 {$set : {
//                     "type" : `Sick`
//                 }}
//             )
//             await UserSchema.findByIdAndUpdate( 
//                 {_id: idUser},
//                 {$set : {
//                     "daysOffSick" : oldSoldSick + reqDays 
                    
//                     }
//                 }
//             )
//         }
//         let allDaysOff = user.allDaysOff + reqDays
//         let diffSick = idReq.type
//         if((allDaysOff > process.env.soldDaysByYear) && (diffSick != 'Sick')) {
//             await daysOff.findByIdAndUpdate(
//                 {_id: id}, 
//                 {$set : {
//                     "type" : `Unpaid`,
//                     "allDaysOff": allDaysOff
//                     }
//                 }
//             )
//         }
//         let newSoldDays = oldSoldDays - reqDays
//         await UserSchema.findByIdAndUpdate( 
//             {_id: idUser},
//             {$set : {
//                 "soldeDays" : newSoldDays
//                 }
//             }
//         )
       
//     }  
// }

// deciosn 
// Decision of request 
exports.daysOffDecision  = async (req, res, next) => {
    const { id } = req.params
    const idReq = await daysOffSchema.findOne({ _id: id })
    if (!idReq) {
        return res.status(404).json({ error: 'Request not found' })
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if (decodedToken.role === "Director") {
            await daysOffSchema.findByIdAndUpdate(
                { _id: id },
                {
                    $set: {
                        "decisionDirector.userIdDir": userId,
                        "decisionDirector.status": req.body.status,
                        "decisionDirector.justification": req.body.justification
                    }
                }
            )
        }
        if (decodedToken.role === "Team manager") {
            await daysOffSchema.findByIdAndUpdate(
                { _id: id },
                {
                    $set: {
                        "decisionManager.userIdMan": userId,
                        "decisionManager.status": req.body.status,
                        "decisionManager.justification": req.body.justification
                    }
                }
            )
        }
        await daysOffSchema.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    "statusDecision": true
                }
            }
        )
        res.status(200).json({ message: "Your answer is succussffully send "});
        return next()
    }
    catch (err) {
        return res.status(503).json({ error: "error send answer of this Days Off ${err}" })
    }
}


//the status of request Accepted or Declined
exports. statusReq = async (req, res) => {
    const { id } = req.params
    const idReq = await daysOffSchema.findOne({ _id: id })
    const idUser = idReq.userId
    let user = await UserSchema.findOne({ _id: idUser })
    let oldSoldDays = user.soldeDays
    let statusMan = idReq.decisionManager.status
    let statusDir = idReq.decisionDirector.status
    let reqDays = idReq.reqDayOff
    let oldSoldSick = user.daysOffSick
    if (statusDir && statusMan === true) {
        await daysOff.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    "statusReq": true
                }
            }
        )
        if (idReq.justificationSick != null ) {
            const daysSick = oldSoldSick + reqDays
            if (daysSick <= process.env.soldDaysOffSick) {
                await UserSchema.findByIdAndUpdate(
                    { _id: idUser },
                    {
                        $set: {
                            "daysOffSick": oldSoldSick + reqDays

                        }
                    }
                )
                await daysOffSchema.findByIdAndUpdate(
                    { _id: id },
                    {
                        $set: {
                            "type": Sick
                        }
                    }
                )
            
            }else {
                await daysOffSchema.findByIdAndUpdate(
                    { _id: id },
                    {
                        $set: {
                            "type": Unpaid
                        }
                    }
                )
                await UserSchema.findByIdAndUpdate(
                    { _id: idUser },
                    {
                        $set: {
                            "allDaysOff": daysSick - process.env.soldDaysOffSick,

                        }
                    }
                )
                
            }

        }
        let allDaysOff = user.allDaysOff + reqDays
        let diffSick = idReq.type
        if ((allDaysOff > process.env.soldDaysByYear) && (diffSick != 'Sick')) {
            await daysOffSchema.findByIdAndUpdate(
                { _id: id },
                {
                    $set: {
                        "type": Unpaid,
                        "allDaysOff": allDaysOff
                    }
                }
            )
        }

        let newSoldDays = oldSoldDays - reqDays
        await UserSchema.findByIdAndUpdate(
            { _id: idUser },
            {
                $set: {
                    "soldeDays": newSoldDays,
                    'allDaysOff': allDaysOff
                }
            }
        )
    }
  
    else if((statusDir === false   && statusMan === false) || (statusDir === true && statusMan === false) || (statusDir === false && statusMan === true) ) {
        await daysOffSchema.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    "statusReq": false
                }
            }
        )
    }
}   


    















