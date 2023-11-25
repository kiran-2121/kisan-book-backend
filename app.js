require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const {connectDB} = require('./db/connect');
const authRouter =require("./routes/auth");
const sellerRouter =require("./routes/seller/sellerRoutes")
const buyerRouter =require("./routes/buyer/buyerRouter")


const cors =require("cors")
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(cors());

app.use(express.json());
// extra packages

app.use("/api/auth",authRouter);

app.use("/api/seller",sellerRouter);

app.use("/api/buyer",buyerRouter);


// app.use(notFoundMiddleware);
// app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const url = process.env.MONGO_URI ;


const start = async () => {
  try {
    
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
    await connectDB(url);
  } catch (error) {
    console.log(error);
  }
};

start();
