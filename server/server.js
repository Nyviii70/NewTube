const express = require("express");
const fileUpload = require('express-fileupload');
const cors = require("cors");

const PORT = 5550;
const app = express();

// Allowed origins
const allowedOrigins = ["http://localhost:8100", "http://yourapp.com"];

// Do you want to skip the checking of the origin and grant authorization?
// si la valeur est true : skip la vérification et si la valeur est false : il vérifie
const skipTheCheckingOfOrigin = false;

// MIDDLEWARES
app.use(
  cors({
    origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
// or allow all origines (skipTheCheckingOfOrigin === true)
console.log("origin: ", origin);
    // s'il n'y a pas d'origine (vient d'un mobile) et que la non vérification de l'origine est true, l'autorisation est accordée
    if (!origin && skipTheCheckingOfOrigin === true) return callback(null, true);
    // s'il y a une origine (vient d'un ordinateur) et que la non vérification de l'origine est true, l'autorisation est accordée
    if (origin && skipTheCheckingOfOrigin === true) return callback(null, true);

    // -1 means that the user's origin is not in the array allowedOrigins
    // si l'origine n'est pas dans le tableau allowedOrigins, ça déclenche une erreur et l'autorisation n'est pas accordée (false)
if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
"The CORS policy for this site does not " +
"allow access from the specified Origin.";

    return callback(new Error(msg), false);
      }
// origin is in the array allowedOrigins so authorization is granted
return callback(null, true);
    },
  })
);

// Add headers
// app.use(function (req, res, next) {

// // Website you wish to allow to connect
// res.setHeader('Access-Control-Allow-Origin', ['http://localhost:8888', 'http://localhost:5550']);
// // res.setHeader('Access-Control-Allow-Origin', '*'); // Allow access from all origins.

// // Request methods you wish to allow
// res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

// // Request headers you wish to allow
// res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

// // Set to true if you need the website to include cookies in the requests sent
// // to the API (e.g. in case you use sessions)
// res.setHeader('Access-Control-Allow-Credentials', true);

// // Pass to next layer of middleware
// next();
// });

app.use(express.json());
app.use(fileUpload());

// ROUTES
app.get("/", (req, res) => {
console.log("req: ", req);
console.log("========================================================");
console.log("req.headers: ", req.headers);
const headers = req.headers;
const host = headers.host;
console.log("host: ", host);
res.json({ msg: "Bienvenue sur le serveur" });
});

app.post("/authentication", (req, res) => {
  console.log("req.headers: ", req.headers);
console.log("req.body: ", req.body);
console.log("req.query: ", req.query);
console.log("req.params: ", req.params);
res.json({ token: "fnjcdkwxhkjn<;qdzkflaurène" });
});

app.post("/upload", (req, res) => {
    if (req.files) {
        console.log("File received: ");
        console.log(req.files);

      let file = req.files.file;
        console.log("file: ", file);

      let filename = file.name

// Move file from memory to folder
        file.mv(`./storage/${filename}`, function (err) {

          if (err) {
                res.json({ error: err });
            }else{
                res.json({ msg: "Receipt and storage of a file with success" });
            }
        })
    } else {
}
})

// launch server
app.listen(PORT, (err, res) => {
  console.log(`Listening to port ${PORT}`);
});
