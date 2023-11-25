const express =require('express');
const {getSellerRecords,addSeller, deleteSeller,getRecordForUpdate,updateSeller,searchSeller} = require("../../controllers/seller/sellerController");
const {verifyToken} = require("../../middleware/userVerify")
const {sellerRecordValid} = require("../../middleware/seller/sellerValid")
const router = express.Router();

router.post('/addseller',verifyToken,sellerRecordValid, addSeller);

router.get('/getsellers',verifyToken,getSellerRecords);

router.delete('/deleteSeller',deleteSeller);

router.get('/getseller',getRecordForUpdate);

router.put('/updateseller',updateSeller);

router.get('/searchseller',verifyToken,searchSeller);





module.exports=router;