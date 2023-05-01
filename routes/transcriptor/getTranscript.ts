import { Request, Response } from "express"
import db from "../../schemas/transcripts.js"

export default async function getTranscript(req: Request, res: Response) {
    if (!req.body.token || req.body.token !== process.env.TRANSCRIPTS) return res.status(400).send({ success: false, reason: "no key?" })
    try {
        var database = await db.findOne({ msgid: req.query.msgid })
    } catch {
        return res.status(400).send({ success: false, reason: "msgid not found in db" })
    }
    res.status(200).send({ text: database?.text, username: database?.username, guild: database?.guild, msgid: database?.msgid })
}