import { ObjectId } from "mongodb";
import IRepository from "../interfaces/irepository";
import Database from "../services/database";
import IUser from "../interfaces/iuser";

class UserRepository implements IRepository<IUser> {
    collection = "users"

    async create(entity: IUser): Promise<IUser> {
        const db = await Database.connect();
        const users = await db.collection<IUser>(this.collection);
        await users.insertOne(entity);
        await Database.disconnect();
        return entity;
    }

    async update(entity: Partial<IUser>): Promise<IUser | null> {
        const db = await Database.connect();
        const users = await db.collection<IUser>(this.collection);
        const _id = new ObjectId(entity._id);
        delete entity._id;

        const result = await users.findOneAndUpdate(
            { _id },
            { $set: entity },
            { returnDocument: "after" }
        );

        await Database.disconnect();
        return result;
    }

    async delete(entity: IUser): Promise<boolean> {
        const db = await Database.connect();
        const users = await db.collection<IUser>(this.collection);
        const result = await users.deleteOne(
            { _id: new ObjectId(entity._id) },
        );

        await Database.disconnect();
        return result.deletedCount ? true : false;
    }


    async findById(entity: IUser): Promise<IUser | null> {
        const db = await Database.connect();
        const users = await db.collection<IUser>(this.collection);
        const foundUser = await users.findOne({ _id: new ObjectId(entity._id) });
        await Database.disconnect();
        return foundUser;
    }

    async findAll(): Promise<IUser[]> {
        const db = await Database.connect();
        const users = await db.collection<IUser>(this.collection);
        const allUsers = await users.find().toArray();
        await Database.disconnect();
        return allUsers;
    }

    async login(entity: IUser): Promise<IUser | null> {
        const db = await Database.connect();
        const users = await db.collection<IUser>(this.collection);
        const user = await users.findOne(
            { email: entity.email, password: entity.password },
            { projection: { _id: 1, name: 1, profilePic: 1 } }
        );
        await Database.disconnect();
        return user;
    }
}

export default UserRepository;
