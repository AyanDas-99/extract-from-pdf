const express = require('express')
const app = express()
const port = 3000
const path = require('path')
app.use(express.static('templates'))
app.use('/static', express.static('public'))

// multer
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

// extract pdf
const {storeToFile} = require('./extract');

app.get('/', (req, res) => {
    res.sendFile(__dirname, 'index.html')
})


app.post('/extract', upload.array('pdf', 1), async function (req, res, next) {
  console.log(req.files)
  fileName = await storeToFile(path.join(__dirname, req.files[0].path))
  console.log(fileName)
  res.redirect(`http://localhost:3000/static/`+fileName);
  // res.sendFile(__dirname, '/static/'+d);
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})