var express = require('express');
var firebase = require('./firebase');
var tokenFactory = require('./firebaseTokenFactory').tokenFactory;
var app = express();
var bodyParser = require('body-parser');
var Cookies = require("cookies");
var serverUrl = '0.0.0.0';
var fs = require('fs');

app.use('/murmur', express.static('client'));
app.use(bodyParser.json());

app.use(Cookies.express());

app.post('/')

app.get('/noToken', function(request, response){
  fs.readFile('client/src/invite.html', function(err, data){
    if(err){
      console.log('error reading invite.html');
      console.log(process.cwd());
    }else{
      response.setHeader('Content-Type', 'text/html');
      response.send(data);
    }
  })
})

app.post('/noToken', function(request, response){
  if(request.cookies.get('token')){
    console.log('already have a token')
    request.method = 'get';
    // response.redirect('/murmur');
    response.send({redirect: '/murmur'});
  } else if(request.body.inviteCode === 'mks22'){                   // set Token Cookie
    response.cookies.set('token', tokenFactory(), {
      maxAge: 2628000000,   // expires in 1 month
      httpOnly: false,    // more secure but then can't access from client
    })
    request.method = 'get';
    response.send({redirect: '/murmur'});
  } else {
    response.send('Correct Invitation Code Required.')
  }
})

app.get('/signin', function(request, response){
  fs.readFile('client/src/signin.html', function(err, data){
    if(err){
      console.log('error reading signin.html');
      console.log(process.cwd());
    }else{
      response.setHeader('Content-Type', 'text/html');
      response.send(data);
    }
  })
})

app.get('/signup', function(request, response){
  fs.readFile('client/src/signup.html', function(err, data){
    if(err){
      console.log('error reading signin.html');
      console.log(process.cwd());
    }else{
      response.setHeader('Content-Type', 'text/html');
      response.send(data);
    }
  })
})

app.get('/', function(request, response){
  response.redirect('/signin');
})

app.post('/signin', function(request, response){
  firebase.signin(request, response);
})

app.post('/signup', function(request, response){
  firebase.signup(request, response);
})

app.get('/user/*', function(request, response){
  fs.readFile('client/src/home.html', function(err,data){
    if(err){
      console.log('error reading home.html');
      console.log(process.cwd());
    }else{
      response.setHeader('Content-Type', 'text/html');
      response.send(data);
    }
  })
})

// app.post('/', function(request, response){ //request.body.url = 'newPost'
//   console.log('got /');
//   firebase.insertPost(request, response);
// })

app.post('/murmur/comment', function(request, response){ //request.body.url = 'newPost'
  firebase.comment(request, response);
})

app.post('/murmur/vote', function(request,response){ //request.body.url = 'newPost'
  firebase.votePost(request, response);
})

app.post('/murmur/voteComment', function(request,response){ //request.body.url = 'newPost'
  firebase.voteComment(request, response);
})

app.post('/murmur/favorite', function(request,response){ //request.body.url = 'newPost'
  firebase.toggleFavorite(request, response);
})

app.listen(3000, serverUrl);

