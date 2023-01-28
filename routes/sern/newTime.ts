import sernTime from "../../schemas/sern-time.js"
import { Request, Response } from "express"

export default async function newTime(req: Request, res: Response) {
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
}