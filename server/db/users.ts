import { User } from '~/server/models/User';
import bcrypt from 'bcrypt';

export interface UserData {
    account: string;
    password: string;
    name: string;
}

export const createUser = (userData: UserData): Promise<any> => {
    return User.create({
        ...userData
    });
}

export const getUserByAccount = async (account: string): Promise<any | null> => {
    return await User.where("account").equals(account).findOne().exec();
}

export const getUserById = async (id: string): Promise<any | null> => {
    return await User.where("_id").equals(id).findOne().exec();
}

export const getUserList = async () => {
    return await User.find({}, { name: 1, account: 1, SMART: 1, GLOBE: 1, DITO: 1, CHERRY: 1, OTHER: 1 });
}

export const changeRate = async (userId: string, type: string, newRate: number) => {
    switch (type) {
        case "GLOBE":
            return await User.findByIdAndUpdate(userId, { GLOBE: newRate }, { new: true })
        case "SMART":
            return await User.findByIdAndUpdate(userId, { SMART: newRate }, { new: true })
        case "DITO":
            return await User.findByIdAndUpdate(userId, { DITO: newRate }, { new: true })
        case "CHERRY":
            return await User.findByIdAndUpdate(userId, { CHERRY: newRate }, { new: true })
        case "OTHER":
            return await User.findByIdAndUpdate(userId, { OTHER: newRate }, { new: true })
    }
}

export const resetPassword = async (userId: string, newPassword: string) => {
    const bcryptedPassword = await bcrypt.hash(newPassword, 10);
    return await User.findByIdAndUpdate(userId, { password: bcryptedPassword }, { new: true })
}

export const deleteUser = async (userId: string) => {
    return await User.findByIdAndDelete(userId);
}