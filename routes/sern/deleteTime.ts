import sernTime from "../../schemas/sern-time.js"
import { Request, Response } from "express"

export default async function deleteTime(req: Request, res: Response) {
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
}