const express =require('express');
const {signup,signinWithOTP,verifyOtp} = require("../controllers/auth");
const router = express.Router();


router.post('/signup',signup);

// router.post('/signup',signup);
router.post("/otp", signinWithOTP);
router.post("/verify",verifyOtp);



module.exports=router;