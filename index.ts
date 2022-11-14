import mongoose from "mongoose"
import express from "express"
const app = express()
import * as dotenv from "dotenv"
dotenv.config()
import sernTime from "./schemas/sern-time.js"
import bodyParser from "body-parser"
import rateLimit from "express-rate-limit"
import { consolelogTime } from "./util/consolelogTime.js"
app.use(bodyParser.json())
app.disable("x-powered-by")
const limiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	max: 30,
	message: { error: "You just got ratelimited." },
	standardHeaders: true,
	legacyHeaders: false,
})
app.use(limiter)

await mongoose.connect(`${process.env.MONGODB}`).then(() => {
	consolelogTime(`Connected to MongoDB!`)
})

app.post("/sern/newTime", async (req, res, next) => {
	if (
		req.body.timezone &&
		req.body.key === process.env.SERN_TIME &&
		req.body.userid
	) {
		sernTime.exists({ userid: req.body.userid }, function (err, doc) {
			if (err) throw err
			if (doc) {
				res.status(400).json({ "error": "You already created a timezone!" })
			} else {
				if (doc) {
					res
						.status(400)
						.json({ "error": "User already exists in the database." })
				} else {
					const saveToDB = new sernTime({
						timezone: req.body.timezone,
						userid: req.body.userid,
					})
					saveToDB.save()
					res.json({ "ok": "you were added successfully!" })
				}
			}
		})
	} else {
		res.status(400).json({
			"error": "make sure you have the right params.",
		})
	}
})

app.get("/sern/getTime", async (req, res, next) => {
	if (req.query.userid) {
		sernTime.exists({ userid: req.query.userid }, async function (err, doc) {
			if (err) throw err
			if (doc) {
				const timezone = (await sernTime.findOne({ userid: req.query.userid }))?.timezone
				res.json({"timezone": timezone})
			} else {
				res.status(400).json({
					"error": "you don't exist in the database",
				})
			}
		})
	} else {
		res.status(400).json({
			"error": "make sure you have the userid param",
		})
	}
})

app.delete("/sern/deleteTime", async (req, res) => {
	if (req.query.userid && req.query.key === process.env.SERN_TIME) {
		sernTime.exists({ userid: req.query.userid }, async function (err, doc) {
			if (err) throw err
			if (doc) {
				const timezone = await sernTime.findOne({ userid: req.query.userid })
				await timezone!.delete()
				res.json({"ok": "done"})
			} else {
				res.status(400).json({
					"error": "the user doesn't exist",
				})
			}
		})
	} else {
		res.status(400).json({
			"error": "make sure you have the userid param and the right key",
		})
	}
})

app.listen(7272, () => {
	consolelogTime(`listening`)
})
