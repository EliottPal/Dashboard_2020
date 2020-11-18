
var express = require('express');
var parser = require('body-parser');
var mongooseService = require('mongoose');
var cors = require('cors');

var port = 8080

var options = {
  server: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000
    }
  },
  replset: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000
    }
  }
};

var DATABASE_URL = "mongodb://mongo:27018/db_dashboard";

mongooseService.connect(DATABASE_URL, options);

var databse = mongooseService.connection;
databse.on('error', console.error.bind(console, 'Database connection error'));
databse.once('open', function() {
    console.log("Connection ok");
});

var app = express();

app.use(cors());

var serverRouter = express.Router();


var userDatas = mongooseService.Schema({
  email: String,
  password: String,
  username: String,
});

var User = mongooseService.model('User', userDatas);

serverRouter.route('/')
    .get(function(req, res) {
        console.log("GET");
        User.find(function(err, users) {
            if(err) {
                res.send(err);
            }
            res.json(users);
        });
    })
    .post(function(req, res) {
        console.log("PUT");
        let user = new User();

        console.log(req.body);
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;
        user.dashboards = req.body.dashboards;
        user.save(function (err) {
            if (err)
                res.send(err);
            res.send({success: true, msg: 'New User is now in your db'});
        });
    })
    .put(function(req, res) {
        console.log("put")
    })
    .delete(function(req, res) {
        console.log("delete")
    });

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(parser.urlencoded({extended: false}));
app.use(parser.json());
app.use(serverRouter);

module.exports = User;

app.listen(port, () => console.log(`Server listening on port : ${port}`));