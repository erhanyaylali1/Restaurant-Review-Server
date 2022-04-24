export interface IUserDB {
	first_name: string;
	last_name: string;
	email: string;
	password?: string;
	token?: string;
	image?: string;
	isPasswordValid: (password: string) => boolean;
}

export interface ISignUpUserBody {
	first_name: string;
	last_name: string;
	email: string;
	password?: string;
	token?: string;
	image?: string;
}

export interface ISignInUserBody {
	email: string;
	password: string;
}

export interface ISignInUserResponse {
	_id: any;
	token: string;
	first_name: string;
	last_name: string;
	email: string;
	image?: string;
}
