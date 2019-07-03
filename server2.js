const express = require('express');
const app = express();
var request = require('request');
var page_access_token = 'EAAEZByNRD06kBAPWlrzveEQvwSPupF2az8SkCg80OiUsm083Iaxf9ZBO7b5SNddppGLrx0oFY8caZCkpaqgpDDoSZADRUVidWVPaZCERsZCXCZAvxpUN0HODPgguIgja1PlLNFlAxzNw4rhZAGYUkqWH60w0FSmCBmXztMmpOzhDIQVqZAMkkGTqZABRpk9Y04LZBYqvmLEoDldqQZDZD';
app.use(require('body-parser').json());
app.use(require('cors')());

app.get('/api/getposts', (req, res) => {
  request.get(
    {uri: 'https://graph.facebook.com/v3.3/626457141164291/feed?access_token=' + page_access_token}
    , function (error, response, body) {
      console.log(response.statusCode);
      if (!error && response.statusCode == 200) {
        console.log(body);
        res.send(body);

        var json_body = JSON.parse(body);
        console.log(json_body.data);
      }
      else {
        console.log(response.body);
        res.send(response);
      }
    }
  )
});

app.post('/postmessage', (req, res) => {
  request.post(
    {uri:  'https://graph.facebook.com/v3.3/626457141164291/feed?message=%22test%20again%20again2%22&access_token=' + page_access_token}
  , function (error, response, body) {
    console.log(response.statusCode);
    if (!error && response.statusCode == 200) {
      console.log(body);
      res.send(body);
    }
    else {
      console.log(response.body);
      res.send(response);
    }
  });
});

app.post('/api/commentpost/:id/:content', (req, res) => {
  request.post(
    {uri:  'https://graph.facebook.com/v3.3/'+ req.params.id + '/comments?message='+ encodeURIComponent(req.params.content) + '&access_token=' + page_access_token}
  , function (error, response, body) {
    console.log(response.statusCode);
    if (!error && response.statusCode == 200) {
      console.log(body);
      res.send(body);
    }
    else {
      console.log(response.body);
      res.send(response);
    }
  });
});

app.post('/api/like', (req, res) => {
  request.post(
    {uri:  'https://graph.facebook.com/v3.3/'+ req.params.id + '/likes?access_token=' + page_access_token}
  , function (error, response, body) {
    console.log(response.statusCode);
    if (!error && response.statusCode == 200) {
      console.log(body);
      res.send(body);
    }
    else {
      console.log(response.body);
      res.send(response);
    }
  });
}); 

app.get('/api/getcomments/:id', (req, res) => {
  request.get(
    {uri: 'https://graph.facebook.com/v3.3/'+ req.params.id + '/comments?access_token=' + page_access_token}
    , function (error, response, body) {
      console.log(response.statusCode);
      if (!error && response.statusCode == 200) {
        console.log(body);
        res.send(body);

        var json_body = JSON.parse(body);
        console.log(json_body.data);
      }
      else {
        console.log(response.body);
        res.send(response);
      }
    }
  )
});

app.get('/webhooks', (req, res) => {
  console.log(req.query);
  res.send(req.query['hub.challenge']);
});

app.post('/webhooks', (req, res) => {
  console.log(req.body);
  console.log(req.body.entry[0].changes);
  res.send(200);
});

app.listen(3000, () => console.log('Server running'));
