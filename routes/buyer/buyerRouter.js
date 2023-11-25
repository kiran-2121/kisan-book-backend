const express =require('express');
const {addBuyer,getBuyerRecords, deleteBuyerRecord, getBuyerForUpdate,updateBuyerRecord, searchBuyer} = require("../../controllers/buyer/buyerController");
const { verifyToken } = require('../../middleware/userVerify');



const router = express.Router();

router.post('/addbuyer',verifyToken, addBuyer);

router.get('/getbuyers', verifyToken,  getBuyerRecords);

router.delete('/deletebuyer', verifyToken,  deleteBuyerRecord);

router.get('/getbuyer', verifyToken,  getBuyerForUpdate);

router.put('/updatebuyer', verifyToken, updateBuyerRecord);

router.get('/searchbuyer', verifyToken, searchBuyer);






module.exports=router;