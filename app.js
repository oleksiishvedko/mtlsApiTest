const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const MongoClient = require("mongodb").MongoClient;

const indexRouter = require("./routes/index");

const app = express();
const jsonParser = express.json();
const mongoClient = new MongoClient("mongodb://localhost:27017/", {
  useUnifiedTopology: true,
});
let dbClient;

mongoClient.connect((err, client) => {
  if (err) return console.log(err);
  dbClient = client;
  app.locals.collection = client.db("mtlsApiTestDB").collection("consentIds");
  app.listen(3001, () => {
    console.log("Server is waiting for a connection...");
  });
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

process.on("SIGINT", () => {
  dbClient.close();
  process.exit();
});

module.exports = app;
