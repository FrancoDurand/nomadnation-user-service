import { ObjectId } from "mongodb";
import IUser from "../interfaces/iuser";

class User implements IUser {
    _id?: string | ObjectId;
    name: string;
    email: string;
    password?: string;
    profilePic?: string;

    constructor(user: IUser) {
        this._id = user._id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.profilePic = user.profilePic;
    }

}

export default User;