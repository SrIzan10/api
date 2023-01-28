import axios from "axios"
import { Request, Response } from "express"

export default async function download(req: Request, res: Response) {
	const url = req.query.url as string
	const filetype = req.query.type as string

	function typeResolver(filetype: string) {
		switch (filetype) {
			case "png":
				return {
					success: true,
					extension: "png",
					contentType: "image/png",
				}
			case "jpg" || "jpeg":
				return {
					success: true,
					extension: "jpg",
					contentType: "image/jpeg",
				}
			case "gif":
				return {
					success: true,
					extension: "gif",
					contentType: "image/gif",
				}
			default:
				return {
					success: false,
					extension: "idk",
					contentType: "idk/idk",
				}
		}
	}

	try {
		const fileTypeResolved = typeResolver(filetype)
		if (!fileTypeResolved.success)
			return res.status(400).send({ error: 'Image needs to be either png, jpg or gif' })
		
		const response = await axios.get(url, { responseType: "stream" })
		res.set({
			"Content-Disposition": `attachment; filename=download.${fileTypeResolved.extension}`,
			"Content-Type": fileTypeResolved.contentType,
		})
		response.data.pipe(res)
	} catch (error) {
		console.error(error)
		res.status(400).send({ error: 'File not found' })
	}
}
