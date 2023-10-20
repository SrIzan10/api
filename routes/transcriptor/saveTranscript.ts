import type { Handler } from "express"
import { prisma } from "../../index.js"

export const post: Handler = async (req, res) => {
    if (!req.body.token || req.body.token !== process.env.TRANSCRIPTS) return res.status(400).send({ success: false, reason: "no key?" })
    const data = req.body
    await prisma.transcripts.create({
        data: {
            msgid: data.msgid,
            username: data.username,
            guild: data.guild,
            text: data.text
        }
    }).catch(() => {
        return res.status(500).json({ success: false, error: 'that didnt work' })
    })
    res.send({ success: true })
}