const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const port = 3001;
const signUpRouter = require("./routes/signInRoute");
const paymentRouter = require("./routes/paymentRoute");
const scoresRoutes = require("./routes/scoresRoutes");
const adminRouter = require("./routes/adminRoute");
const { testTable } = require("./controller/payments");
const { tokenAuthCheck } = require("./middleware/jwtAuthCheck");
const priceRoutes = require("./routes/priceRoutes");
const changPasswordRouter = require("./routes/changePasswordRoute");
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static(__dirname + '/public'))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origins", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-with,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST,PATCH,PUT,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

app.get("/", (req, res) => {
  console.log("done");
});


app.use('/prices',priceRoutes);

app.use("/admin", adminRouter);

app.use("/members", signUpRouter);

app.use("/payment", paymentRouter);

app.use("/scores", scoresRoutes); 

app.use("/changepassword",changPasswordRouter)
app.listen(port, () => {
  console.log(`http://localhost:${port} is running`);
});
