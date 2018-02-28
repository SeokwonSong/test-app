const express = require('express');
const router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../../dbconfig.js');
var connection = mysql.createConnection(dbconfig);
var nodemailer = require('nodemailer');

var multer = require('multer');
var fs = require('fs');
var app = express();

var path = './uploads/';

var storage = multer.diskStorage({
  destination: path,
  filename: function (req, file, callback) {
    console.log(file);

    fs.realpath(path, function (err, stats) {
      if (err) throw err;
      console.log(stats);

      var exists = fs.existsSync(stats);
      console.log('file exists ? ' + exists);

      //fs.exists(stats + "/" + file.originalname, function (exists) {
      //  console.log("file exists ? " + exists);
      //});
      console.log(stats + "/" + file.originalname);
    });

    callback(null, file.originalname);
  }
});

var upload = multer({ storage: storage }).any();


//app.use(function (req, res, next) {
//  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//  res.setHeader('Access-Control-Allow-Methods', 'POST');
//  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//  res.setHeader('Access-Control-Allow-Credentials', true);
//  next();
//});

//app.use(multer({
//  dest: path,
//  rename: function (fieldname, filename) {
//    return filename + Date.now();
//  },
//  onFileUploadStart: function (file) {
//    console.log(file.originalname + ' is starting ...');
//  },
//  onFileUploadComplete: function (file) {
//    console.log(file.fieldname + ' uploaded to  ' + file.path);
//  }
//}).any());

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get all posts
router.get('/posts', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  //axios.get(`${API}/posts`)
  //  .then(posts => {
  //    res.status(200).json(posts.data);
  //  })
  //  .catch(error => {
  //    res.status(500).send(error)
  //  });
  connection.query('SELECT * from customer', function (err, rows) {
  console.log("qwefqwef");
    if (err) throw err;

    console.log('The solution is: ', rows);
    res.send(rows);
  });
});

router.post('/', (req, res) => {
  console.log(req);
  console.log(res);
  res.send('post api works');
});

router.get('/upload', function (req, res) {
  console.log(req);
  console.log(res);
  res.end('file catcher example');
});

router.post('/upload', function (req, res) {
  upload(req, res, function (err) {
    
    console.log(err, 'Im in post , inside upload' + path);
    if (err) {
      return res.end('Error uploading file.');

    }
    console.log("asdfasdf: " + req.file)
    res.end('File is uploaded' + path);
    console.log('File is uploaded' + path);

  });
});

router.post('/mail', (req, res) => {
  console.log("test");
  res.send('mail');

  console.log(req);

  nodemailer.createTestAccount((err, account) => {
    if (err) {
      console.error('Failed to create a testing account');
      console.error(err);
      return process.exit(1);
    }

    console.log('Credentials obtained, sending message...');

    // NB! Store the account object values somewhere if you want
    // to re-use the same account for future mail deliveries

    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport(
      {
        host: '192.168.0.201',
        port: 25,
        secure: false,
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false
        },
        logger: false,
        debug: false // include SMTP traffic in the logs
      },
      {
        // default message fields

        // sender info
        from: 'nodemail@test.com',
        headers: {
          'X-Laziness-level': 1000 // just an example header, no need to use this
        }
      }
    );

    // Message object
    let message = {
      // Comma separated list of recipients
      to: 'swsong0917@wisekit.co',

      // Subject of the message
      subject: 'Nodemailer is unicode friendly ✔',

      // plaintext body
      text: 'Hello to myself!',

      // HTML body
      html:
      '<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p>' +
      '<p>Here\'s a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@example.com"/></p>',

      // An array of attachments
      attachments: [
        // String attachment
        {
          filename: 'notes.txt',
          content: 'Some notes about this e-mail',
          contentType: 'text/plain' // optional, would be detected from the filename
        },

        // Binary Buffer attachment
        {
          filename: 'image.png',
          content: Buffer.from(
            'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
            '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
            'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
            'base64'
          ),

          cid: 'note@example.com' // should be as unique as possible
        },

        // File Stream attachment
        //{
        //  filename: 'nyan cat ✔.gif',
        //  path: __dirname + '/assets/nyan.gif',
        //  cid: 'nyan@example.com' // should be as unique as possible
        //}
      ]
    };

    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.log('Error occurred');
        console.log(error.message);
        return process.exit(1);
      }

      console.log('Message sent successfully!');
      console.log(nodemailer.getTestMessageUrl(info));

      // only needed when using pooled connections
      transporter.close();
    });
  });
})

module.exports = router;
