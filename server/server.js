var express = require('express');
var firebase = require('./firebase');
var tokenFactory = require('./firebaseTokenFactory').tokenFactory;
var app = express();
var bodyParser = require('body-parser');
var Cookies = require("cookies");
var serverUrl = '0.0.0.0';
var fs = require('fs');

app.use(bodyParser.json());
app.use(Cookies.express());

app.use('/r/:name', express.static('client'));
// app.post('/r/:name', function(request, response){
//   console.log(process.cwd());
//   response.sendFile(process.cwd()+'/client/index.html');
// });


app.get('/noToken', function(request, response){
  fs.readFile('client/src/invite.html', function(err, data){
    if(err){
      console.log('error reading invite.html');
      // console.log(process.cwd());
    }else{
      response.setHeader('Content-Type', 'text/html');
      response.send(data);
    }
  })
});

app.post('/noToken', function(request, response){
  if(request.cookies.get('token')){
    console.log('already have a token')
    request.method = 'get';
    // response.redirect('/murmur');
    response.send({redirect: '/murmur'});
  } else if(request.body.inviteCode === 'mks22'){                   // set Token Cookie
    response.cookies.set('token', tokenFactory(), {
      // maxAge: 2628000000,   // expires in 1 month
      httpOnly: false,    // more secure but then can't access from client
    })
    request.method = 'get';
    response.send({redirect: '/murmur'});
  } else {
    response.send('Correct Invitation Code Required.')
  }
});

app.get('/', function(request, response){
  if(request.cookies.get('token')){
    response.redirect('/murmur');
  } else {
    console.log('no token redirect')
    response.redirect('/noToken');
  }
});

app.post('/', function(request, response){ //request.body.url = 'newPost'
  console.log('got /');
  firebase.insertPost(request, response);
});

app.post('/murmur/comment', function(request, response){ //request.body.url = 'newPost'
  firebase.comment(request, response);
});

app.post('/murmur/vote', function(request,response){ //request.body.url = 'newPost'
  firebase.votePost(request, response);
});

app.post('/murmur/voteComment', function(request,response){ //request.body.url = 'newPost'
  firebase.voteComment(request, response);
});

app.post('/murmur/favorite', function(request,response){ //request.body.url = 'newPost'
  firebase.toggleFavorite(request, response);
});

app.post('/user/*', function(request, response){
  var user = request.originalUrl.slice(6);
  firebase.createRoom(request, response, user);
});

app.get('/r/*', function(request, response){
  // console.log(request.originalUrl);
  var roomname = request.originalUrl.slice(3);
  console.log(roomname);

  if(request.cookies.get('token')){
    response.redirect('/murmur');
  } else {
    console.log('no token redirect')
    response.redirect('/noToken');
  }
});

app.post('/r/*', function(request, response){
  firebase.insertPost(request, response);
});

app.listen(3000, serverUrl);

