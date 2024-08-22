const express = require("express");
const dotenv = require("dotenv");
const database = require("./config/database");
const systemConfig = require("./config/system");
const methodOverride = require('method-override');
const bodyParser = require("body-parser");
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');

dotenv.config();

database.connect();

const routesClient = require("./routes/client/index.route");
const routesAdmin = require("./routes/admin/index.route");

const app = express();
const port = process.env.PORT;

// Flash
app.use(cookieParser('JHSVBDSDSD'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// End Flash

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static('public'));

app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Routes 
routesClient(app);
routesAdmin(app);

app.listen(port, () => {
  console.log(`app listening in port ${port}`);
})