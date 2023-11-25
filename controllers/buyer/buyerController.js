const { Buyer } = require("../../models/buyer/buyerModel");

const addBuyer = async (req,res) =>{
    const id = req.user.id;

    const buyer = new Buyer({
        buyerId:id,
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        primaryMobileNumber:req.body.primaryMobileNumber,
        secondaryMobileNumber:req.body.secondaryMobileNumber,

        address:{
            address1:req.body.address1,
            location:req.body.location,
            city:req.body.city,
            state:req.body.state,
            country:req.body.country,
            pinCode:req.body.pinCode

        }
        
      });
      const isBuyerExist = await Buyer.findOne({ primaryMobileNumber: buyer.primaryMobileNumber });

      if (isBuyerExist) {
        return res.status(400).json({ error: "Buyer is already present" });
      }
    

      buyer.save((err)=>{
        if(err){
            return res.status(500).send(err);
        }
        else{
            res.status(201).json({buyer});
        }
      })

}


const getBuyerRecords = async (req, res) => {
    const userId = req.user.id;
  
    const page = parseInt(req.query.page); 
    const limit = parseInt(req.query.limit); 
  
    const numberOfRecordToSkip = (page - 1) * limit;
  
      const buyers = await Buyer.find({
        $or: [
          {
            brokerId: {
              $in: userId,
            },
          },
    
          {
            buyerId: {
              $in: userId,
            },
          },
        ],
      }).skip(numberOfRecordToSkip).limit(limit);
     

      const totalBuyers = await Buyer.countDocuments({
        $or: [
          {
            brokerId: {
              $in: userId,
            },
          },
          {
            buyerId: {
              $in: userId,
            },
          },
        ],
      });
      const data = {
        buyers: buyers,
        totalBuyers: totalBuyers,
      };
      res.status(200).json(data);
    
  };

  const deleteBuyerRecord = async (req, res) => {
    const id = req.query.buyerId;
    console.log(id);
  
    const buyer = await Buyer.findOne({ _id: id });
    console.log(buyer);
  
    if (!buyer) {
      return res.status(400).json({ message: "User not found" });
    }
  
    await Buyer.deleteOne({ _id: buyer._id });
  
    res.status(200).json({ message: "Deleted Successfully" });
  };

  const getBuyerForUpdate = async (req, res) => {
    const id = req.query.buyerId;
  
    const buyer = await Buyer.findOne({ _id: id });
  
    res.status(200).json(buyer);
  };

  const updateBuyerRecord = async (req, res) => {
    const id = req.query.buyerId;
  
    const updateBuyer = await Buyer.findByIdAndUpdate(id, {
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      primaryMobileNumber: req.body.primaryMobileNumber,
      secondaryMobileNumber: req.body.secondaryMobileNumber,
  
      address: {
        address1: req.body.address1,
        location: req.body.location,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        pinCode: req.body.pinCode,
      },
    })
      .then(() => {
        res.status(200).json({ message: "Updated successfully" });
      })
      .catch(() => {
        res.status(500).json({ error: "Not updated data" });
      });
  };



const searchBuyer = async (req, res) => {
  const userId = req.user.id;

  const buyers = await Buyer.find({
    $or: [
      {
        brokerId: {
          $in: userId,
        },
      },
      {
        buyerId: {
          $in: userId,
        },
      },
    ],
  });

  const result = buyers.filter((buyer) => {
    return (
      buyer.firstName.match(new RegExp(req.query.str, "i")) ||
      buyer.middleName.match(new RegExp(req.query.str, "i")) ||
      buyer.lastName.match(new RegExp(req.query.str, "i")) 
    );
  });

  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const numberOfRecordToSkip = (page - 1) * limit;

  const resultData = result.slice(
    numberOfRecordToSkip,
    numberOfRecordToSkip + limit
  );

  const totalSearchBuyer = result.length;

  const data = {
    buyers: resultData,
    totalBuyers: totalSearchBuyer,
  };

  res.status(200).json(data);
};


module.exports = {addBuyer ,getBuyerRecords,deleteBuyerRecord,getBuyerForUpdate,updateBuyerRecord,searchBuyer};
