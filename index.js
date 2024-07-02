const express = require("express");
const dotenv = require("dotenv");
const routesClient = require("./routes/client/index.route");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.set("views", "./views");
app.set("view engine", "pug");

// Routes Client
routesClient(app);

app.listen(port, () => {
  console.log(`app listening in port ${port}`);
})