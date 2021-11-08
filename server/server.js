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

app.get("/", (req, res) => {
    res.sendFile('/root/Clowz/src/src/app/add/multi-file-upload/multi-file-upload.component.html')
});

app.post("/storage", (req, res) => {
    if (req.files) {
        console.log("File received: ")
        console.log(req.files)
        let file = req.files.file
        console.log("file: ", file);
        let filename = file.name

        file.mv(`./storage/${filename}`, function (err) {
            if (err) {
                res.send(err);
            }else{
                res.send("fichier bien envoyé");
            }
        })
    }
})

app.listen(PORT, (err, res) => {
    console.log(`Listening to port ${PORT}`)
});