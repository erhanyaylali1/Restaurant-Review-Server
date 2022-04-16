import UserService from "../services/User.service";
import { Request, Response } from "express";
import { ISignInUserResponse } from "../interfaces/UserInterfaces";

class UserController {
	private _service = new UserService();

	signUp = (request: Request, response: Response) => {
		return this._service
			.signUp(request.body.user)
			.then((message: string) => response.status(200).send(message))
			.catch((error) => {
				console.error(error);
				response.status(400).send(error);
			});
	};

	signIn = (request: Request, response: Response) => {
		return this._service
			.signIn(request.body.user)
			.then((user: ISignInUserResponse) => response.status(200).send(user))
			.catch((error: Error) => {
				console.error(error);
				response.status(400).send(error.message);
			});
	};
}

export default UserController;
