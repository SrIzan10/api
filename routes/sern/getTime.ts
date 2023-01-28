import sernTime from "../../schemas/sern-time.js"
import { Request, Response } from "express"

export default async function getTime(req: Request, res: Response) {
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
}