const {Buyer} = require("../models/buyer/buyerModel")
const {Seller} = require("../models/seller/sellerModel")

const {User,Address} = require("../models/User")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");

const signup = async (req, res) => {
  
 
};



// const signup = async (req, res) => {
//     const userReq = new User({
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email,
//       password: req.body.password,
//       phoneNumber: req.body.phoneNumber,
//       type: req.body.type,
//     });
  
//     const user = await User.findOne({ phoneNumber: userReq.phoneNumber });
  
//     if (user) {
//       const isTypeExist = user.type.includes(req.body.type);
  
//       if (isTypeExist) {
//         return res.status(400).json({ message: "User is already present" });
//       } else {
//         user.type.push(req.body.type);
//         await user.save();
//         try {
//           return res
//             .status(200)
//             .json({ message: "Updated user type", user: user });
//         } catch {
//           return res.status(500).send("Not add user type");
//         }
//       }
//     }
  
//     userReq.password = await bcrypt.hash(userReq.password, 10);
  
//     await userReq.save();
  
//     const address = new Address({
//       userId: userReq._id,
//       address1: req.body.address1,
//       location: req.body.location,
//       city: req.body.city,
//       state: req.body.state,
//       country: req.body.country,
//       pinCode: req.body.pinCode,
//     });
  
//     address.save((err) => {
//       if (err) {
//         return res.status(500).send(err);
//       } else {
//         return res.status(201).json({
//           message: "User created successfully",
//           user: userReq,
//           address: address,
//         });
//       }
//     });
//   };
  
  const signinWithOTP = async (req, res) => {
    const phoneNumber = req.body.mobileNumber;
  
    const user = await User.findOne({ phoneNumber: phoneNumber });
  
    if (!user) {
      return res.status(400).send({ message: "User not resistered for this mobile number" });
    }
  
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
  
    await user.updateOne({ otp: otp }, (err) => {
      if (err) {
        res.send(err);
      } else {
        res.status(200).json({ message: "OTP sent successfully", otp: otp });
      }
    });
  
    // const otpSave = new Otp({
    //   userId: user._id,
    //   phoneNumber: user.phoneNumber,
    //   otp: otp,
    // });
  
    // otpSave.save((err) => {
    //   if(err) {
    //     res.send(err);
    //   } else {
    //     res.status(200).json({message:"OTP sent successfully",otp:otp});
    //   }
    // });
  };

  const verifyOtp = async (req, res) => {
    const phoneNumber = req.body.mobile;
    const otp = req.body.otp;

    console.log(phoneNumber,otp)
  
    const user = await User.findOne({ phoneNumber: phoneNumber });
    console.log(user);
  
    if (user) {
      if (otp == user.otp) {
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
  
        return res.status(200).json({ message: "Login successfully", token });
      } else {
        res.status(400).json({message:"Please enter correct OTP"});
      }
    }
  };





module.exports ={signup,signinWithOTP,verifyOtp};



