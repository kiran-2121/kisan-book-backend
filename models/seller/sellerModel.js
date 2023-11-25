const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  brokerId: [
    {
      type: String,
    },
  ],
  buyerId: [
    { 
      type: String,
    },
  ],
  firstName: {
    required: true,
    type: String,
  },
  middleName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },

  primaryMobileNumber: {
    required: true,
    type: Number,
  },
  secondaryMobileNumber: {
    type: Number,
  },
  image:{
        data: Buffer,
        contentType: String
    },
    address:{
           address1:{
            required:true,
            type:String
        },
        location:{
            required:true,
            type:String
        },
        city:{
            required:true,
            type:String
        },
        state:{
            required:true,
            type:String
        },
        country:{
            required:true,
            type:String
        },
        pinCode:{
            required:true,
            type:Number
        }
    }
        
    
});


const Seller = mongoose.model("Seller", sellerSchema);

module.exports = { Seller };
