import mongoose from "mongoose"
import express from "express"
const app = express()
import * as dotenv from "dotenv"
dotenv.config()
import sernTime from "./schemas/sern-time.js"
import bodyParser from "body-parser"
import rateLimit from "express-rate-limit"
app.use(bodyParser.json())
app.disable("x-powered-by")
const limiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	max: 50,
	message: { error: "You just got ratelimited." },
	standardHeaders: true,
	legacyHeaders: false,
})
app.use(limiter)

await mongoose.connect(`${process.env.MONGODB}`).then(() => {
	console.log("Connected to MongoDB!")
})

app.post("/sern/newTime", async (req, res, next) => {
	if (
		req.body.name &&
		req.body.timezone &&
		req.body.key === process.env.SERN_TIME &&
		req.body.userid
	) {
		sernTime.exists({ userid: req.body.userid }, function (err, doc) {
			if (err) throw err
			if (doc) {
				res.status(400).json({ "error": "You already created a timezone!" })
			} else {
				sernTime.exists({ name: req.body.name }, function (err, doc) {
					if (err) {
						throw err
					} else {
						if (doc) {
							res
								.status(400)
								.json({ "error": "User already exists in the database." })
						} else {
							const saveToDB = new sernTime({
								name: req.body.name,
								timezone: req.body.timezone,
							})
							saveToDB.save()
							res.json({ "ok": "kay done" })
						}
					}
				})
			}
		})
	} else {
		res.status(400).json({
			"error":
				"make sure you have name, timezone and key as a JSON post. You could also have your key wrong.",
		})
	}
})

app.get("/sern/availableTime", async (req, res, next) => {
	let get = (await sernTime.find()) as any
	get = get.map((data) => data.name)
	res.send(get)
})

app.get("/sern/getTime", async (req, res, next) => {
	if (req.query.name) {
		let get = (await sernTime.find({ name: req.query.name })) as any
		get = get.map((data) => data.timezone)
		res.send(get)
	} else {
		res.json({ "error": "Option name not provided." })
	}
})

app.listen(7272, () => {
	console.log(`listening`)
})
