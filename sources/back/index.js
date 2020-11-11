const express = require('express')
var app = express();
const port = 8080;
var mongoose = require('mongoose');
var cors = require('cors');

var DATABASE_URL = "mongodb://mongo:27017/dashboard";
var router = express.Router();
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false,
  poolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};


mongoose.connect(DATABASE_URL, options);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error in connection'));
db.once('open', function() {
  console.log("Connection ok");
});


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password : {
      type: String,
      unique: true,
      required: true,
    },
  },
  );

const UserProps = mongoose.model('User', userSchema);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors({origin: 'http://localhost:3000'}));

router.route('/')
  .get(
    function(suc, err) {
      console.log("GET")
      userSchema.find(function(err, usersList) {
        if (err)
          res.send(err);
        res.json(usersList)
      });
    }
  )
  .post(
    function(suc, res) {
      console.log("POST")
      let user = new UserProps();

      user.username = suc.username;
      user.password = suc.password;
      user.save(function(err) {
        if (err)
          res.send(err);
        res.send({success: true, message: "User added to database"});
      })
    }
  )
  .put(
    function(suc, res) {
      console.log("PUT");
    }
  )
  .delete(
    function(suc, res) {
      console.log("DELETE");
    }
  )

app.use(router);

module.exports = userSchema;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});