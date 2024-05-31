import { ObjectId } from "mongodb";

interface IUser {
    _id?: string | ObjectId;
    name: string;
    email: string;
    password?: string;
    profilePic?: string;
}

export default IUser;