
const sellerRecordValid = (req, res, next) => {
    const { primaryMobileNumber,firstName,middleName,lastName,address } = req.body;

   
    const phonePattern = /^[0-9]{10}$/;
  
    if (!phonePattern.test(primaryMobileNumber)) {
      return res.status(400).json({ error: 'Invalid phone number' });
    }

    if (!firstName || !middleName || !lastName ) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
    
    next();
 
};

module.exports = {sellerRecordValid};


