import UserModel from "./model/user-model.js";

class UserDao {
    async createUser(data){
        try {
            const newUser = await UserModel.create(data);
            return newUser;
        } catch (error) {
            throw error;
        }
    };
    async getUsers(){
        try {
            const users = await UserModel.find();
            return users;
        } catch (error) {
            throw error;
        }
    };
    async getUserById(uid){
        try {
            const user = await UserModel.findOne(uid);
            return user;
        } catch (error) {
            throw error;
        }
    };
    async getUserByEmail(email){
        try {
            const user = await UserModel.findOne({email});
            return user;
        } catch (error) {
            throw error;
        }
    };
    async updateUser(uid, data){
        try {
            const userUpdate = await UserModel.findByIdAndUpdate(uid, data, {new: true});
            return userUpdate;
        } catch (error) {
            throw error;
        }
    };
    async deleteUser(uid){
        try {
            const user = await UserModel.findByIdAndDelete(uid);
            return user;
        } catch (error) {
            throw error;
        }
    };
}

export default new UserDao();