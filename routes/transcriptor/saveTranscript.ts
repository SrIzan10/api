import { Request, Response } from "express"
import db from "../../schemas/transcripts.js"

export default async function saveTranscript(req: Request, res: Response) {
    if (!req.body.token || req.body.token !== process.env.TRANSCRIPTS) return res.status(400).send({ success: false, reason: "no key?" })
    const data = req.body
    const database = new db({
        guild: data.guild,
        msgid: data.msgid,
        text: data.text,
        username: data.username
    })
    await database.save()
    res.send({ success: true })
}