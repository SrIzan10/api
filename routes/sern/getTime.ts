import { prisma } from "../../index.js"
import type { Handler } from "express"

export const get: Handler = async (req, res) => {
    if (req.query.userid) {
		if (await prisma.sern_timezones.count({ where: { userid: req.query.userid as string } }) === 0)
			return res.status(400).json({
				error: "the user doesn't exist",
			})
		const timezone = await prisma.sern_timezones.findUnique({
			where: {
				userid: req.query.userid as string,
			}
		})
		res.json({ timezone: timezone?.timezone })
	} else {
		res.status(400).json({
			error: "make sure you have the userid param",
		})
	}
}