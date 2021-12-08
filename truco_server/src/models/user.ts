import { ObjectId } from 'mongodb';

export default class User {
    constructor(
        public name: string,
        public socketId: string,
        public wins: number,
        public id?: ObjectId
    ) {}

    public isEqual(user: User): boolean {
        return this.id === user.id;
    }
}