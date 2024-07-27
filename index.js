const express = require("express");
const dotenv = require("dotenv");
const database = require("./config/database");

dotenv.config();

database.connect();

const routesClient = require("./routes/client/index.route");
const routesAdmin = require("./routes/admin/index.route");

const app = express();
const port = process.env.PORT;

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static('public'));

// Routes 
routesClient(app);
routesAdmin(app);

app.listen(port, () => {
  console.log(`app listening in port ${port}`);
})