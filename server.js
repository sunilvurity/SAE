const express = require('express');
const Twitter = require('twit');

const app = express();
const client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token: '',
  access_token_secret: ''
});

app.use(require('cors')());
app.use(require('body-parser').json());

app.get('/api/user', (req, res) => {
  client
    .get('account/verify_credentials')
    .then(user => {
      res.send(user);
    })
    .catch(error => {
      res.send(error);
    });
});

app.get('/api/usertweets', (req, res) => {
  const params = { tweet_mode: 'extended', count: 100, 'user_id':req.query.userId };
  client
    .get(`statuses/user_timeline`, params)
    .then(timeline => {
      res.send(timeline);
    })
    .catch(error => res.send(error));
});

app.get('/api/handlertweets', (req, res) => {
  const params = { tweet_mode: 'extended', count: 100, q: req.query.q, result_type: 'popular' };
  client
    .get(`search/tweets`, params)
    .then(handlertweets => {
      res.send(handlertweets);
    })
    .catch(error => res.send(error));
});

app.get('/api/userfriends', (req, res) => {
  const params = { tweet_mode: 'extended', count: 100 };
  client
    .get(`friends/list`, params)
    .then(handlertweets => {
      res.send(handlertweets);
    })
    .catch(error => res.send(error));
});

let cache = [];
let cacheAge = 0;

app.get('/api/home', (req, res) => {
  if (Date.now() - cacheAge > 60000) {
    cacheAge = Date.now();
    const params = { tweet_mode: 'extended', count: 200 };
    if (req.query.since) {
      params.since_id = req.query.since;
    }
    client
      .get(`statuses/home_timeline`, params)
      .then(timeline => {
        cache = timeline;
        res.send(timeline);
      })
      .catch(error => res.send(error));
  } else {
    res.send(cache);
  }
});

app.post('/api/favorite/:id', (req, res) => {
  const path = req.body.state ? 'create' : 'destroy';
  client
    .post(`favorites/${path}`, { id: req.params.id })
    .then(tweet => res.send(tweet))
    .catch(error => res.send(error));
});

app.post('/api/retweet/:id', (req, res) => {
  const path = req.body.state ? 'retweet' : 'unretweet';
  client
    .post(`statuses/retweet/${req.params.id}`)
    .then(tweet => res.send(tweet))
    .catch(error => res.send(error));
});

app.post('/api/senddirectmessage', (req, res) => {
  const data = {"event": {"type": "message_create", "message_create": {"target": {"recipient_id": "1121202912946819072"}, "message_data": {"text": req.body.message}}}};
  client
    .post(`direct_messages/events/new`, data)
    .then(tweet => res.send(tweet))
    .catch(error => res.send(JSON.stringify(req.body)));
});

app.listen(3000, () => console.log('Server running'));
