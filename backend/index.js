const express = require("express");
const fs = require("fs");
const path = require("path");
const formidable = require("formidable");
const uniqueString = require("unique-string");
var cors = require('cors')
var app = express()
 
app.use(cors()) 
app.use("/files", express.static(__dirname + "/uploads"));

app.post("/upload", (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var oldPath = files.file.path;
    if (files.file.name) {
      var ext = path.extname(files.file.name || "").split(".");
      var ext = ext[ext.length - 1];
      new_file_name = uniqueString() + "." + ext;
      var newPath = path.join(__dirname, "./uploads") + "/" + new_file_name;
      var rawData = fs.readFileSync(oldPath);
      fs.writeFile(newPath, rawData, function (err) {
        if (err) {
          return res.json({
            msg: "failed",
            status: 0,
          });
        }
        return res.json({
          msg: "Successfully uploaded",
          url: "https://nodefilesharing.herokuapp.com/files/" + new_file_name,
          status: 1,
        });
      });
    } else {
      res.json({
        msg: "Failed! Please Upload a valid file",
        status: 0,
      });
    }
  });
});

app.listen(process.env.PORT||3000, function (err) {
  if (err) console.log(err);
  console.log("Server is live");
});
