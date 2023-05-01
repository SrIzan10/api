import mongoose from "mongoose"
import express from "express"
import 'dotenv/config'
import bodyParser from "body-parser"
import rateLimit from "express-rate-limit"
import { consolelogTime } from "./util/consolelogTime.js"
import swagger from './docs/swagger.json' assert { type: 'json' }
import swaggerUI from 'swagger-ui-express'

/* Mongoose */
await mongoose.connect(`${process.env.MONGODB}`).then(() => {
	consolelogTime(`Connected to MongoDB!`)
})

/* Express configuration */
const app = express()
const limiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	max: 10,
	message: { success: false, reason: "you just got ratelimited", error: "You just got ratelimited." },
	standardHeaders: true,
})
app.use(bodyParser.json())
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swagger));
app.use(express.static('public'))
app.disable("x-powered-by")

/* All route imports */
import newTime from "./routes/sern/newTime.js"
import getTime from "./routes/sern/getTime.js"
import deleteTime from "./routes/sern/deleteTime.js"
import download from "./routes/misc/download.js"
import saveTranscript from "./routes/transcriptor/saveTranscript.js"
import getTranscript from "./routes/transcriptor/getTranscript.js"

app.use("/sern/newTime", limiter)
app.post("/sern/newTime", async (req, res) => {
	newTime(req, res)
})

app.use("/sern/getTime", limiter)
app.get("/sern/getTime", async (req, res) => {
	getTime(req, res)
})

app.use("/sern/newTime", limiter)
app.delete("/sern/deleteTime", async (req, res) => {
	deleteTime(req, res)
})

app.use("/misc/download", limiter)
app.get("/misc/download", async (req, res) => {
	download(req, res)
})

app.use("/transcriptor/save", limiter)
app.post("/transcriptor/save", (req, res) => {
	saveTranscript(req, res)
})

app.use("/transcriptor/get", limiter)
app.post("/transcriptor/get", (req, res) => {
	getTranscript(req, res)
})

app.listen(7272, () => {
	consolelogTime(`Listening`)
})
