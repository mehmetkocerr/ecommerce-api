const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors")

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
	"Access-Control-Allow-Headers",
	"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();  
});
app.use(cors());
 
//Import Routes
const authRoutes = require("./routes/auth");
const routes = require("./routes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());  

// Middleware
app.use(express.json());
//Route Middlewares
app.use("/api/auth/user", authRoutes);
app.use("/api/", routes);


app.listen(5000, () => console.log("server kalktı."));
