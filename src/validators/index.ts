import { validationResult } from "express-validator";
import { Request, Response } from "express";

export default function (req: Request, res: Response, next: Function) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.error(errors.array().at(0)?.msg);
		return res.status(422).json({ errors: errors.array()[0].msg });
	}
	next();
}
