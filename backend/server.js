const express = require("express");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
const app = express();

//calling environment file start
dotenv.config();
//calling environment file end
//cors setting start
const cors = require("cors");
let allowed = ["http://localhost:3000", "otherlink"];
function options(req, res) {
  let tmp;
  let origin = req.header("Origin");
  if (allowed.indexOf(origin) > -1) {
    tmp = {
      origin: true,
      optionSuccessStatus: 200,
    };
  } else {
    tmp = {
      origin: "Nonexistant",
    };
  }
  res(null, tmp);
}
app.use(cors(options));

//cors settings end

// const useRoutes = require("./routes/user");
// app.use("/", useRoutes);
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

app.get("/", (req, res) => {
  res.send("this is home dir");
});

app.get("/bike", (req, res) => {
  res.send("this is bike dir");
});

//const PORT = process.env.PORT || 8000; //GETTING variables from evn if it exits and if not it will be 8000

app.listen(process.env.PORT || 8000, () => {
  console.log(`SERVER IS RUNNING ON PORT : ${process.env.PORT}`);
});
