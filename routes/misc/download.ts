import type { Handler } from "express"

export const get: Handler = async (req, res) => {
	res.send('Disabled due to security reasons')
}
