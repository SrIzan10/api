import { prisma } from "../../index.js"
import type { Handler } from "express"

export const post: Handler = async (req, res) => {
	if (
		req.body.timezone &&
		req.body.key === process.env.SERN_TIME &&
		req.body.userid
	) {
		if (await prisma.sern_timezones.count({ where: { userid: req.body.userid as string } }) !== 0)
			return res.status(400).json({ "error": "User already exists in the database." })
		const userid = req.body.userid as string
		const timezone = req.body.timezone as string
		await prisma.sern_timezones.create({
			data: {
				userid,
				timezone
			}
		}).catch(() => {
			return res.status(500).json({ "error": "internal server error" })
		})

		res.json({ "ok": "you were added successfully!" })
	} else {
		res.status(400).json({
			"error": "make sure you have the right params",
		})
	}
}