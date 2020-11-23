var express = require('express');
var parser = require('body-parser');
var mongooseService = require('mongoose');
var cors = require('cors');
const axios = require('axios')
const fetch = require('node-fetch');
const querystring = require('querystring');
const qs = require('qs');

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
  google           : {
    id           : String,
    token        : String,
    email        : String,
    name         : String
  }
});

var User = mongooseService.model('User', userDatas);

const githubClientId = '2abdf5bdc242d6cf071e';
const githubClientSecret = '17e13cc066ccf42195afef9ad029a75f94357267'

const spotifyClientId = '7bc91382df86470ca2c58ed007c5efbf';
const spotifyClientSecret = '390a5de8bf0c4b3db264e648aa2bf4d5';

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

const encodeFormData = (data) => {
  return Object.keys(data)
      .map(key => encodeURIComponent(key) + encodeURIComponent(data[key]))
      .join('&');
}

serverRouter.route('/home/github/:code')
    .get(function(req, res) {
      console.log("GET GH");
      console.log(req.params.code);
      const requestToken = req.params.code;
      axios({
        method: 'post',
        url: `https://github.com/login/oauth/access_token?client_id=${githubClientId}&client_secret=${githubClientSecret}&code=${requestToken}`,
        headers: {
          accept: 'application/json'
        }
      }).then((response) => {
        const accessToken = response.data.access_token;
        console.log(accessToken);
        res.json({access: accessToken});
      })
    })
    .post(function(req, res) {
      console.log("POST GH");
    })
    .put(function(req, res) {
      console.log("PUT GH");
    })
    .delete(function(req, res) {
      console.log("DELETE GH");
    })

serverRouter.route('/home/spotify/:code')
    .get(function(req, res) {
      console.log("SPOTIFY GET");
      console.log(req.params.code);
      let body = {
        grant_type: "authorization_code",
        code: req.params.code,
        redirect_uri: 'http://localhost:3000/',
        client_id: spotifyClientId,
        client_secret: spotifyClientSecret
      }
      axios({
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'accept': 'application/json'
        },
        data: qs.stringify(body)
      })
      .then((response) => {
        const accessToken = response.data.access_token;
        const refreshToken = response.data.refresh_token;
        const expiresIn = response.data.expires_in;
        res.json({access: accessToken, refresh: refreshToken, expires: expiresIn});
      })
    })
    .post(function(req, res) {
      console.log("SPOTIFY POST");
    })
    .put(function(req, res) {
      console.log("SPOTIFY PUT");
    })
    .delete(function(req, res) {
      console.log("SPOTIFY DELETE");
    })

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