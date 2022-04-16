import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { IUserDB } from "../interfaces/UserInterfaces";

const userSchema = new Schema<IUserDB>(
	{
		first_name: { type: String, required: true },
		last_name: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		image: { type: String, required: false },
	},
	{
		timestamps: true,
	}
);

userSchema.pre("save", function (next) {
	if (this.isModified("password")) {
		this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
		next();
	} else {
		next();
	}
});

userSchema.methods.isPasswordValid = function (password: any) {
	return bcrypt.compareSync(password, this.password);
};

const User = model<IUserDB>("User", userSchema);

export default User;
