import express from "express"
import 'dotenv/config'
import rateLimit from "express-rate-limit"
import { consolelogTime } from "./util/consolelogTime.js"
import { router } from "express-file-routing"
import path from 'node:path'
import { fileURLToPath } from 'node:url';
import { PrismaClient } from "@prisma/client"
const exec = (await import('util')).promisify((await import('child_process')).exec);

const dirname = path.dirname(fileURLToPath(import.meta.url));

if (process.argv[2] !== '--dev') await exec('npx prisma generate')

/* MongoDB */
export const prisma = new PrismaClient()

/* Express configuration */
const app = express()
const limiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	max: 30,
	message: { success: false, reason: "you just got ratelimited", error: "You just got ratelimited." },
	standardHeaders: true,
})
app.use(express.json())
app.use(express.static('public'))
app.use(limiter)
app.disable("x-powered-by")

router({ directory: path.join(dirname, '/routes') }).then((r) => {
	app.use("/", r);
  
	app.listen(7272, () => {
		consolelogTime(`Listening`)
	})
});
