const dotenv = require('dotenv')
const fs = require('fs')

dotenv.config()
fs.writeFile(process.env.GCP_KEY_FILE, process.env.GCP_CRED, (err) => console.log(err))
