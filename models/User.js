const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true, 
    type: String,
  },
  
  email: {
    required: true,
    type: String,
  },
  phoneNumber: {
    required: true,
    type: Number,
  },
  password: {
    required: true,
    type: String,
  },
  type:[{
    required:true,
    type:String
  }],
  otp: {
    type: Number,
  },
});

const addressSchema = new mongoose.Schema({
  userId:{
      required:true,
      type:String,
  },
  address1:{
      required:true,
      type:String,
  },
  location:{
      required:true,
      type:String,
  },
  city:{
      required:true,
      type:String,
  },
  state:{
      required:true,
      type:String,
  },
  country:{
      required:true,
      type:String,
  },
  pinCode:{
      required:true,
      type:Number,
  },
})

const User = mongoose.model("User", userSchema);
const Address = mongoose.model("Address", addressSchema);


module.exports = { User,Address };
