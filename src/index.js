const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const Sequelize=require("sequelize"); 
const cors = require("cors");
const studentModel=require("./models/studentModel.js");
//const route=require("./routes/route.js");
app.use(bodyParser.json());
app.use(bodyParser.json({extended:true}));


const sequelize = new Sequelize(studentModel.DB, studentModel.root, studentModel.sharma, {
  host: studentModel.HOST,
  dialect: studentModel.dialect,
  operatorsAliases: false,

  pool: {
    max: studentModel.pool.max,
    min: studentModel.pool.min,
    acquire: studentModel.pool.acquire,
    idle: studentModel.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;


db.Sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


//app.use('/',route);

app.listen(process.env.PORT||3000,function(){

  console.log("Express app is running on port"+(process.env.PORT||3000))
});

module.exports = db;