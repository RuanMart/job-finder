const express = require("express");

const Job = require("../models/Job.js");

const router = express();

router.get("/view/:id", (req, res) => {
	Job.findOne({ where: { id: req.params.id } })
		.then((job) => {
			res.render("view", {
				job,
			});
		})
		.catch((err) => console.log(err));
});

router.get("/add", (req, res) => {
	res.render("add");
});

router.post("/add", (req, res) => {
	let { title, salary, company, description, email, new_job } = req.body;

	Job.create({
		title,
		salary,
		company,
		description,
		email,
		new_job,
	})
		.then(() => res.redirect("/"))
		.catch((err) => console.log(err));
});

module.exports = router;
