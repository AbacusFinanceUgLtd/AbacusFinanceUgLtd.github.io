require("dotenv").config();
const pg = require("pg");
const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

let credentialObject;

const credentialObjForLocalDev = {
  connectionString: connectionString,
};

const credentialObjForProd = {
  connectionString: process.env.DATABASE_URL,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
};

if (isProduction) {
  credentialObject = credentialObjForProd;
} else {
  credentialObject = credentialObjForLocalDev;
}

const db = new pg.Client(credentialObject);
db.connect((error) => {
  if (error) {
    console.log("Failed to connect to the database!");
    console.log("error message: " + error.message);
    console.log(error);
  } else {
    console.log("Database successfully connected!");
  }
});

module.exports = db;
