const dotenv = require('dotenv')
const fs = require('fs')

dotenv.config()

const path = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const data = process.env.GCP_CRED;
const callback = (err) => console.log(err);

fs.writeFile(path, data, callback);
