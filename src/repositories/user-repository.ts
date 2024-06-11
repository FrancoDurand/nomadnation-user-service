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

        return result;
    }

    async delete(entity: IUser): Promise<boolean> {
        const db = await Database.connect();
        const users = await db.collection<IUser>(this.collection);
        const result = await users.deleteOne(
            { _id: new ObjectId(entity._id) },
        );

        return result.deletedCount ? true : false;
    }


    async findById(entity: IUser): Promise<IUser | null> {
        const db = await Database.connect();
        const users = await db.collection<IUser>(this.collection);
        return await users.findOne({ _id: new ObjectId(entity._id) });
    }

    async findAll(): Promise<IUser[]> {
        const db = await Database.connect();
        const users = await db.collection<IUser>(this.collection);
        return await users.find().toArray();
    }

    async login(entity: IUser): Promise<IUser | null> {
        const db = await Database.connect();
        const users = await db.collection<IUser>(this.collection);
        return await users.findOne({ email: entity.email, password: entity.password }, { projection: { _id: 1 } });
    }
}

export default UserRepository;