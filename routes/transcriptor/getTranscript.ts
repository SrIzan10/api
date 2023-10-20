import type { Handler } from "express"
import { prisma } from "../../index.js"

export const get: Handler = async (req, res) => {
    if (!req.query.msgid) return res.status(400).json({  error: "msgid is required" })
    if (await prisma.transcripts.count({ where: { msgid: req.query.msgid as string } }) === 0)
        return res.status(400).json({
            error: "the message doesn't exist",
        })
    const database = await prisma.transcripts.findUnique({
        where: {
            msgid: req.query.msgid as string
        }
    })
    res.status(200).send({ text: database?.text, username: database?.username, guild: database?.guild, msgid: database?.msgid })
}