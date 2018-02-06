const express = require('express');
const router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../../dbconfig.js');
var connection = mysql.createConnection(dbconfig);

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

module.exports = router;
