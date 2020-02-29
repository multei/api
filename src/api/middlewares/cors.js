const Cors = require("cors");

const corsOptions = {
  origin: process.env.CORS_ORIGIN
}

const cors = Cors(corsOptions)

module.exports = cors
