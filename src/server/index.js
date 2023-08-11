let path = require('path')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
const bodyParser = require('body-parser')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const dotenv = require('dotenv')
dotenv.config()

const cors = require('cors')

const app = express()
const base_url = 'https://api.meaningcloud.com/sentiment-2.1'
const api_key = process.env.API_KEY

app.use(cors());
app.use(express.static('dist'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.listen(8082, function () {
    console.log('App listening on port 8082')
})

app.post('/postData', (req, res) => {
    const url = `${base_url}?key=${api_key}&url=${req.body.url}&lang=auto`
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      res.send(data)
      console.log(data)
    })
    .catch((err) => {
      console.log('Error thrown', err)
    })
})
