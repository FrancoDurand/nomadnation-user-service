import { Request, Response } from 'express';
import IUser from '../interfaces/iuser';
import UserRepository from '../repositories/user-repository';

class UserController {
    static repository = new UserRepository;

    public static async findById(req: Request, res: Response): Promise<void> {
        try {
            const user: IUser = req.body;

            if (!user._id) {
                res.status(400).json({ message: 'Invalid user data' });
                return;
            }

            const result = await UserController.repository.findById(user);
            res.status(200).json(result);
        }
        catch (e) {
            res.status(500).json({ message: 'Internal server error', error: e });
        }
    }

    public static async findAll(req: Request, res: Response): Promise<void> {
        try {
            const result = await UserController.repository.findAll();
            res.status(200).json(result);
        }
        catch (e) {
            res.status(500).json({ message: 'Internal server error', error: e });
        }
    }

    public static async register(req: Request, res: Response): Promise<void> {
        try {
            if (!req.file) {
                res.status(400).json({ message: 'No profile pic' })
                return;
            }

            const user: IUser = req.body;

            if (!user.name || !user.email || !user.password) {
                res.status(400).json({ message: 'Invalid user data' });
                return;
            }
            const result = await UserController.repository.create(user);

            if (result)
                res.status(200).json(result);
            else
                res.status(400).json({ message: 'User not created' });
        }
        catch (e) {
            res.status(500).json({ message: 'Internal server error', error: e });
        }
    }

    public static async update(req: Request, res: Response): Promise<void> {
        try {
            const user: IUser = req.body;

            if (!user._id) {
                res.status(400).json({ message: 'Invalid user data' });
                return;
            }

            const result = await UserController.repository.update(user);

            if (result) {
                res.status(200).json({ message: "User updated", user: user });
            }
            else
                res.status(400).json({ message: "User not updated" });
        }
        catch (e) {
            res.status(500).json({ message: 'Internal server error', error: e });
        }
    }

    public static async delete(req: Request, res: Response): Promise<void> {
        try {
            const user: IUser = req.body;

            if (!user._id) {
                res.status(400).json({ message: 'Invalid user data' });
                return;
            }

            const result = await UserController.repository.delete(user);

            if (result) {
                res.status(200).json({ message: "User deleted" });
            }
            else
                res.status(400).json({ message: "User not deleted" });
        }
        catch (e) {
            res.status(500).json({ message: 'Internal server error', error: e });
        }
    }
}

export default UserController;


