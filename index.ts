import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Router from "./src/routes/index";
import mongoose from "mongoose";

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(Router);

if (process.env.DB_CONNECITON_DRIVER) {
	mongoose
		.connect(process.env.DB_CONNECITON_DRIVER)
		.then(() => {
			const port = process.env.SERVER_PORT || 8080;
			app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
		})
		.catch((err) => console.error(err));
} else {
	console.error("DB connection string is missing!");
}
