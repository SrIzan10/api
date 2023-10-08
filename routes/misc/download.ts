import axios from "axios"
import { Request, Response } from "express"

export default async function download(req: Request, res: Response) {
	res.send('Disabled due to security reasons')
}
