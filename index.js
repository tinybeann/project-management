const express = require("express");
const dotenv = require("dotenv");
const database = require("./config/database");
const systemConfig = require("./config/system");
const methodOverride = require('method-override');

dotenv.config();

database.connect();

const routesClient = require("./routes/client/index.route");
const routesAdmin = require("./routes/admin/index.route");

const app = express();
const port = process.env.PORT;

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static('public'));

app.use(methodOverride('_method'));

// App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Routes 
routesClient(app);
routesAdmin(app);

app.listen(port, () => {
  console.log(`app listening in port ${port}`);
})