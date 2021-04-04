const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();
const connectionString = 'mongodb+srv://sanctuary:@Password1@cluster0.gs4uu.mongodb.net/sanctuary?retryWrites=true&w=majority'

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('sanctuary-catalog')
    const dataCollection = db.collection('data')
    //set
    app.set('view engine', 'ejs')
    //use
    app.use(express.static('public'))
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    //get
    app.get('/', (req, res) => {
      db.collection('data').find().toArray()
        .then(results => {
          res.render('index.ejs', { data : results })
        })
        .catch(error => console.error(error))
    })
    //post
    app.post('/data', (req, res) => {
      dataCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/')
    })
    .catch(error => console.error(error))
})
    
    //delete
    app.delete('/data', (req, res) => {
      console.log(req.body.Name);
      dataCollection.deleteOne(
        { Name: req.body.Name },
      )
      .then(result => {
        if (result.deletedCount === 0) {
          return res.json('Nothing to delete')
        }
        res.json(`Deleted`)
      })
      .catch(error => console.error(error))
    })
    
    //put
    app.put('/data', (req, res) => {
      dataCollection.findOneAndUpdate(
        { name: 'Yoda' },
        {
          $set: {
            name: req.body.name,
            address: req.body.quote
          }
        },
        {
          upsert: true
        }
      )
      .then(result => {
        res.json('Success')
      })
      .catch(error => console.error(error))
    })
    //listen
    app.listen(3000, function() {
      console.log('listening on 3000')
    })
  })