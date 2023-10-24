import { prisma } from '../../index.js'
import type { Handler } from 'express'

export const del: Handler = async (req, res) => {
	if (req.query.userid && req.query.key === process.env.SERN_TIME) {
		await prisma.sern_timezones.delete({
			where: {
				userid: req.query.userid as string,
			},
		}).catch(() => {
			return res.status(500).json({ error: 'that didnt work' })
		})
		res.json({ ok: 'done' })
	} else {
		res.status(400).json({
			error: 'make sure you have the userid param and the right key',
		})
	}
}
