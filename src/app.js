const express = require("express");
const mongoose = require("mongoose");

/********** Run Server ***********/
const app = express();
mongoose
  .connect("mongodb://localhost:27017/Tasks-App")
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log("Server is up!");
    });
  })
  .catch((e) => console.log("DB Error! " + e));

app.use(express.json());

/********** Routes ***********/

/********** Page not found ***********/
app.use((req, res) => {
  res.status(404).json({ msg: "PAGE NOT FOUND!" });
});

/********** Catch all errors ***********/
app.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .json({ msg: `${error.status || 500} Internal Server Error! ${error}` });
});
