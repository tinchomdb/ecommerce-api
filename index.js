const express = require("express");

const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const sectionRoute = require("./routes/section");
const orderRoute = require("./routes/order");
const authRoute = require("./routes/auth");

const cors = require("cors");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Picardo Database connection succesfull"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/sections", sectionRoute);
app.use("/api/orders", orderRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server running");
});
