const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();


// app: (create an express server)
const app = express();

//database: (connecting to db with mongoose config)
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then()
  .catch((err) => console.log("DB CONNECTION ERROR:", err));

//middlewares:
app.use(morgan("dev")); //to log requests, errors, and more to the console (GET /api 200 4.087 ms - 19)
app.use(bodyParser.json({ limit: "2mb" })); //parsing the incoming request bodies
app.use(cors()); //allows a server to indicate any other origins (domain, scheme, or port)

//Routes middleware:
//import routes:
//const authRoutes = require('./routes/auth');
//app.use('/api', authRoutes);     //prefixes this route with /api so => /api/create-or-update-user
// => to automatically do above for each file in /routes dir
fs.readdirSync("./routes").map((route) =>
  app.use("/api", require("./routes/" + route))
);

//Route:
/* app.get("/api", (req, res) => {
  res.json({ data: "api page" });
}); */

//port:
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(` app listening on port: ${port}!`));
