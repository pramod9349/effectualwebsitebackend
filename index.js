const express = require("express");
const cors = require("cors");
require("./database/config");
const User = require("./database/user");
const UserArticle = require("./database/userArticle");
const UserCareer = require("./database/userCareer");
const { MongoClient, ServerApiVersion } = require("mongodb");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const multer = require("multer");
const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(fileUpload());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  const allowFileTypes = ["images/png", "images/jpg", "images/jpeg"];
  if (allowFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
let upload = multer({ storage, fileFilter });

const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  port: 465,
  auth: {
    user: "faiz@globallegalassociation.org",
    pass: "faIz#bd32@",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

app.use(express.json());

app.post("/", async (req, resp) => {
  const uri =
    "mongodb+srv://abscod:abscod12345@cluster0.tlalbb1.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  console.log("Connecting to the contact us database");
  client.connect((err) => {
    console.log(err);
  });
  const collection = client.db("effectual-services").collection("contact");
  console.log("Inserting data into the contact us database");
  collection.insertOne(req.body);
  console.log("Done All in acticle");

  // transporter.sendMail({
  //   from: "faiz@globallegalassociation.org",
  //   to: "pramod.katiyar@effectualservices.in",
  //   subject: `${req.body.name} wants to contact with you`,
  //   text: `Here below are the details
  //     Name: ${req.body.name}
  //     Email: ${req.body.email}
  //     Phone: ${req.body.phone}
  //     Message: ${req.body.message}
  //     service_for_enquiry: ${req.body.service_for_enquiry}`,
  // });
});

app.post("/article", async (req, resp) => {
  const uri =
    "mongodb+srv://abscod:abscod12345@cluster0.tlalbb1.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  const collection = client.db("effectual-services").collection("article");
  collection.insertOne(req.body);
  console.log("article");
});

app.post("/career", async (req, resp) => {
  const uri =
    "mongodb+srv://abscod:abscod12345@cluster0.tlalbb1.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  client.connect((err) => {
    console.log(err);
  });
  const collection = client.db("effectual-services").collection("career");
  collection.insertOne(req.body);

  // transporter.sendMail({
  //   from: "faiz@globallegalassociation.org",
  //   to: req.body.email,
  //   subject: "Thank you for applying for a career",
  //   text: "We have got your resume and this email is for acknowledgement",
  // });
  const myFile = req.files.file;
  thisfilename = "clientupload.xlsx";
  myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
    if (err) {
      console.log(err);
      return resp.status(700).send({ msg: "Error hai" });
    }
  });
  
  // transporter.sendMail({
  //   from: "faiz@globallegalassociation.org",
  //   to: " mohakchutani1@gmail.com",
  //   subject: `${req.body.Name} has applied for a career`,
  //   text: `Here below are the details
  //     Name: ${req.body.Name}
  //     Email: ${req.body.email}
  //     Resume: Resume has been attached below`,
  //   attachments: [
  //     {
  //       filename: `${myFile.name}`,
  //       path: `${__dirname}/public/${myFile.name}`,
  //     },
  //   ],
  // });

  console.log(req.body);
});
app.post("/casestudies", async (req, resp) => {
  const uri =
    "mongodb+srv://abscod:abscod12345@cluster0.tlalbb1.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  client.connect((err) => {
    console.log(err);
  });
  const collection = client.db("effectual-services").collection("casesstudies");
  collection.insertOne(req.body);
  console.log("cases studies");
  // transporter.sendMail({
  //   from: "faiz@globallegalassociation.org",
  //   to: "pramod.katiyar@effectualservices.in",
  //   subject: `${req.body.name} has submitted a case study`,
  //   text: `Here below are the details
  //     Name: ${req.body.name}
  //     Email: ${req.body.email}
  //     Company: ${req.body.company}
  //     Contact: ${req.body.contact}
  //     Message: ${req.body.message}`,
  // });
});
app.listen(5000);
