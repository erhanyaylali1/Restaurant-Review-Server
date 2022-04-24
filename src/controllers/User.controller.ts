import UserService from "../services/User.service";
import { Request, Response } from "express";
import { ISignInUserResponse } from "../interfaces/UserInterfaces";

class UserController {
	private _service = new UserService();

	signUp = (request: Request, response: Response) => {
		return this._service
			.signUp(request.body)
			.then((user: ISignInUserResponse) => response.status(200).send(user))
			.catch((error) => {
				console.error(error);
				response.status(400).send({ message: error.message });
			});
	};

	signIn = (request: Request, response: Response) => {
		return this._service
			.signIn(request.body)
			.then((user: ISignInUserResponse) => response.status(200).send(user))
			.catch((error: Error) => {
				console.error(error);
				response.status(400).send({ message: error.message });
			});
	};
}

export default UserController;
