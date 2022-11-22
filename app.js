const express = require("express");

const db = require("./database/connection.js");

const bodyParser = require("body-parser");

const expressHandlebars = require("express-handlebars");

const path = require("path");

const app = express();

const Job = require("./models/Job.js");

const Sequelize = require("sequelize");

const Op = Sequelize.Op;

const port = 3000;

app.listen(port, (req, res) => {
	console.log(`server rodando na porta ${port}`);
});

// body parser
app.use(bodyParser.urlencoded({ extended: false }));

// express handlebars
app.set("views", path.join(__dirname, "views"));
app.engine(
	"handlebars",
	expressHandlebars.engine({
		defaultLayout: "main",
	})
);
app.set("view engine", "handlebars");

// static folder
app.use(express.static(path.join(__dirname, "public")));

// database connection
db.authenticate()
	.then(() => {
		console.log("banco conectado com sucesso");
	})
	.catch((error) => {
		console.log(error);
	});

//jobs routes
app.get("/", (req, res) => {
	let search = req.query.job;

	let query = "%" + search + "%";

	if (!search) {
		Job.findAll({ order: [["createdAt", "DESC"]] })
			.then((jobs) => {
				res.render("index", {
					jobs,
				});
			})
			.catch((err) => console.log(err));
	} else {
		Job.findAll({
			where: { title: { [Op.like]: query } },
			order: [["createdAt", "DESC"]],
		})
			.then((jobs) => {
				res.render("index", {
					jobs,
					search,
				});
			})
			.catch((err) => console.log(err));
	}
});

app.use("/jobs", require("./routes/jobs.js"));
