const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const PORT = 5000
const app = express();

// Authorisation concernant la provenance
app.use(
    cors({
        origin: "*",
        methods: ['GET', 'POST']
    })
)

app.use(fileUpload());

app.get("/images", (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.post("/", (req, res) => {
    if (req.files) {
        console.log("File received: ")
        console.log(req.files)
        let file = req.files.file
        let filename = file.name

        file.mv(`./uploadedFiles/${filename}`, function (err) {
            if (err) {
                res.send(err);
            }else{
                res.sendFile(__dirname + '/page2.html')
            }
        })
    }
})

app.listen(PORT, (err, res) => {
    console.log(`Listening to port ${PORT}`)
});