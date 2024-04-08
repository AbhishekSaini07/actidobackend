var express = require('express');
var router = express.Router();
var db = require('../models');
const path = require('path');
const multer = require('multer');
const {checklogin, newUser} = require('../service/userService');
const { generateToken, verifyToken, decodeToken } = require('../service/jwtServices');
const { newTask, getAllTask, updateTaskStatus, deleteTask } = require('../service/taskService');




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const uploader = multer({ storage: storage });
db.sequelize.sync().then(() => console.log("Connected To Database")).catch((e) => console.log('Error While Connection to Database'));

/* GET home page. */
router.get('/tasks',verifyToken,async function(req,res,next){
  const userId = req.user.userId;
  try {
    const data = await getAllTask(userId);
    if(data){
      console.log(data);
      res.status(200).json(data);
    }
    else{
      res.status(500).json({ error: "User Doesn't Created any Task Yet" });
    }
} catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ error: "Internal server error" });
}
  
});
router.delete('/tasks/:taskId', async (req,res,next)=>{
  const taskId = req.params.taskId;
  console.log("Deleting Data where taskId is " + taskId);
  const result = await deleteTask(taskId); 
  if(result){
    console.log("Deleted Sucessfully")
    res.status(200).json(result);
  }
  else{
    console.log("Deleted Sucessfully")
    res.status(500).json({ error: 'Failed to delete task' });
  }
})
router.put('/tasks/:taskId', async (req, res,next) => {
  const taskId = req.params.taskId;
  console.log("Deleting Data where taskId is " + taskId);
  const result = await updateTaskStatus(taskId); 
  if(result){
    console.log("Updated Sucessfully")
    res.status(200).json(result);
  }
  else{
    console.log("Updated Failed")
    res.status(500).json({ error: 'Failed to delete task' });
  }
});
router.post("/addTask",verifyToken,async function(req,res,next){
  let taskdata = req.body;
  const id = req.user.userId;  // get userId from token
  taskdata.userId = id;
  
  const result = await newTask(taskdata);
  if (result) {
    console.log(result);
    res.status(200).json({ message: 'task added Successfully' });
} else {
    res.status(401).json({ message: 'Invalid username or password' });
}

});
router.get('/getConnectionsData',async function(req,res,next){
  console.log("btrrebrbe\n\n\n\n\n thethht");
  try {
    const data = await db.users.findAll();
    console.log("Retrieved data:", data);
    res.json(data);
} catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ error: "Internal server error" });
}

  
});
router.get('/', function (req, res, next) {
  confirm.log(params.email);
  res.json({message: 'djnj'});
});
router.get('/login', function (req, res, next) {
  res.render('login');
});
router.get('/createAccount', function (req, res, next) {
  res.render('createAccount');
});
router.get('/home',async function (req, res, next) {
  const token = req.query.token;
  if(token){
    console.log(token);
    let user = await decodeToken(token);
    console.log("User is decoded");
    console.log(user);
  res.render("home",{data: user.user});}
  else{
    res.end("Error");
  }
});
router.get("/forgetPassword", function (req, res, next) {
  res.render('forgetPassword');
});
router.get("/setPassword", function (req, res, next) {
  res.render('setPassword');
});

router.post("/login",async function(req,res,next){
  console.log("dnoenwoeifnoiwenfwo");
  let email = req.body.email;
  let password = req.body.password;
  let user = await checklogin(email,password);
  console.log("dnoenwoeifnoiwenfwo");
  if (user) {
    // Generate JWT token with user data
    const token = generateToken(user);
    // Send token as JSON response
    console.log("Token send Done");
    res.status(200).json({ token });
} else {
    res.status(401).json({ message: 'Invalid username or password' });
}

  
});

  
router.post("/signup",async function (req, res, next) {
  // user.pic = req.file.path;
  console.log("\n\n\n\n\n welcome")
  let user = req.body;
  let result = await newUser(user);
  if (result) {
    console.log("Done");
    console.log(result);
    const token = generateToken(user);
    // Send token as JSON response
    res.status(200).json({ token });
  }
  else {
    console.log("Errors");
    res.status(401).json({ message: 'Error While Creating USer' });
}
  
});

module.exports = router;
