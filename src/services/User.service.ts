import User from "../models/User.modal";
import jwt from "jsonwebtoken";
import { ISignInUserBody, ISignUpUserBody, ISignInUserResponse } from "../interfaces/UserInterfaces";

class UserService {
	signUp = async (user: ISignUpUserBody): Promise<string> => {
		const createdUser = new User(user);
		return createdUser
			.save()
			.then(() => "Successfully Signed In!")
			.catch((err: Error) => {
				console.log(err);
				return err.message;
			});
	};

	signIn = async (user: ISignInUserBody): Promise<ISignInUserResponse> => {
		if (process.env.JWT_SECRET) {
			const foundUser = await User.findOne({ email: user.email });
			if (foundUser) {
				const isPasswordValid = foundUser.isPasswordValid(user.password);
				if (isPasswordValid) {
					const token = jwt.sign({ _id: foundUser._id }, process.env.JWT_SECRET);
					const { _id, first_name, last_name, email, image } = foundUser;
					const response: ISignInUserResponse = { _id, first_name, last_name, email, image, token };
					return response;
				} else {
					throw new Error("Password is not valid!");
				}
			} else {
				throw new Error("No user with this email!");
			}
		} else {
			throw new Error("JWT secret key not found!");
		}
	};
}

export default UserService;
