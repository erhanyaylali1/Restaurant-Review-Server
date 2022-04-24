import User from "../models/User.modal";
import jwt from "jsonwebtoken";
import { ISignInUserBody, ISignUpUserBody, ISignInUserResponse } from "../interfaces/UserInterfaces";

class UserService {
	signUp = async (user: ISignUpUserBody): Promise<ISignInUserResponse> => {
		try {
			const createdUser = new User(user);
			return createdUser
				.save()
				.then(() => {
					const token = jwt.sign({ _id: createdUser._id }, process.env.JWT_SECRET as string);
					const { _id, first_name, last_name, email, image } = createdUser;
					const response: ISignInUserResponse = { _id, first_name, last_name, email, image, token };
					return response;
				})
				.catch((err: Error) => {
					throw new Error(err.message);
				});
		} catch (err: any) {
			throw new Error(err.message);
		}
	};

	signIn = async (user: ISignInUserBody): Promise<ISignInUserResponse> => {
		const foundUser = await User.findOne({ email: user.email });
		if (foundUser) {
			if (user.password) {
				const isPasswordValid = foundUser.isPasswordValid(user.password);
				if (isPasswordValid) {
					const token = jwt.sign({ _id: foundUser._id }, process.env.JWT_SECRET as string);
					const { _id, first_name, last_name, email, image } = foundUser;
					const response: ISignInUserResponse = { _id, first_name, last_name, email, image, token };
					return response;
				} else {
					throw new Error("Password is not valid!");
				}
			} else if (user.token) {
				if (user.token && foundUser.token) {
					const token = jwt.sign({ _id: foundUser._id }, process.env.JWT_SECRET as string);
					const { _id, first_name, last_name, email, image } = foundUser;
					const response: ISignInUserResponse = { _id, first_name, last_name, email, image, token };
					return response;
				} else {
					throw new Error("Something bad happen!");
				}
			} else {
				throw new Error("Something bad happen!");
			}
		} else {
			throw new Error("No user with this email!");
		}
	};
}

export default UserService;
