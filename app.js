var options = {
  clientName: 'tgr12',
  clientId: 'tgr12',
};
// var mqtt = require('mqtt');
// var client = mqtt.connect('mqtt://202.139.192.75', options);

var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://202.139.192.75/tgr2020/pm25/data/#');
var client2 = mqtt.connect('mqtt://202.139.192.75/tgr2020/track/data/#');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost";

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const faker = require('faker');
const port = process.env.PORT || 80;


// const User = require('./models/User');
// require('./libs/db-connection');

app.set('view engine', 'ejs');

var count = 0;

setInterval(function () {
  var date = new Date();
  if (date.getSeconds() === 0) {
    let date_ob2 = new Date();
    h = date_ob2.getTime()
    MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("tgr2020");
      var doc = {
        time: h,
        count: count
      };
      dbo.collection("graph").insertOne(doc, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted in Data for graph");
        count = 0;
        db.close();
      });
    })
  }
}, 1000);

// routes
app.get('/', (req, res) => {
  let gt, lt;
  MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("tgr2020");
    dbo.collection("graph").find({}, {
      count: 1,
      time: 1,
      _id: 0
    }).limit(30).toArray(function (err, items) {
      console.log(items);
      res.render('index', {
        dataGraph: items
      });
      // res.send(items);
    });
    // .catch(err => console.error(err));
    db.close();
  });
  // User.find({}, {
  //     firstName: 1,
  //     _id: 0
  //   })
  //   .limit(10)
  //   .then(users => {
  //     console.log(users)
  //     // gt = users.filter(user => user.age > 18);
  //     // lt = users.filter(user => user.age < 18);
  //     res.render('index', {
  //       userName: users
  //       // usernum: 10,
  //       // greater: gt.length,
  //       // less: lt.length
  //     });
  //   })
  //   .catch(err => console.error(err));
});

// app.get('/generate', (req, res) => {
//   for (let i = 0; i < 100; i++) {
//     let firstName = faker.name.firstName(),
//       lastName = faker.name.lastName(),
//       randomAge = Math.round(Math.random() * (90 - 1) + 1);
//     // create users
//     User.create({
//         firstName: firstName,
//         lastName: lastName,
//         age: randomAge
//       })
//       .then(() => {})
//       .catch(err => console.error(err));
//   } // end for loop
//   res.redirect('/');
// });

client.on('connect', function () {
  console.log("MQTT PM2.5 Connected.");
  client.subscribe('tgr2020/pm25/data/#');
})

client.on('message', function (topic, message) {
  console.log(topic.toString() + " => " + message.toString())
  MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("tgr2020");
    var doc = {
      message: message.toString()
    };
    dbo.collection("pm25").insertOne(doc, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      count++;
      db.close();
    });
  })
})

client2.on('connect', function () {
  console.log("MQTT Track Connected.");
  client2.subscribe('tgr2020/track/data/#');
})

client2.on('message', function (topic, message) {
  console.log(topic.toString() + " => " + message.toString())
  MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("tgr2020");
    var doc = {
      message: message.toString()
    };
    dbo.collection("track").insertOne(doc, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      count++;
      db.close();
    });
  })
})




server.listen(port, () => console.log(`App running on port ${port}`));