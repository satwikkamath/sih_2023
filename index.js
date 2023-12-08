const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const app = express()

const path = require('path')

const multer = require('multer')
let fileName

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'test')
    },
    filename: (req, file, cb) => {
        console.log(file)
        fileName = Date.now() + path.extname(file.originalname)
        cb(null, fileName)
    }

})

const upload = multer({ storage: storage })


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.post("/upload", upload.single('image'), (req, res) => {  /* 'image' same as input name */

    res.sendFile(__dirname + "/index.html")

})

app.get('/predict', (req, res) => {
    const pythonScriptPath = 'predict.py';
    const pythonCommand = 'python';

    exec(`${pythonCommand} ${pythonScriptPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Python script: ${error}`);
            res.status(500).send('Internal Server Error');
            return;
        }

        console.log(`Python script output:\n${stdout}`);
        res.json({ results: stdout.split('\n') });
    });
});

app.get('/getPhoto', function (req, res) {

    res.sendFile(__dirname + "/runs/detect/predict/" + fileName)


})
app.listen(3000, function () {
    console.log("Running")
})






