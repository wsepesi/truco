import { ObjectId } from 'mongodb';
import User from './user';

export default class Room {
    public name: string;
    public users: User[];
    public host: User;
    public other: User;
    public id?: ObjectId;

    constructor(name: string, host: User) {
        this.users = [];
        this.name = name;
        this.host = host;
        this.users.push(host);
    }

    public joinRoom(user: User): void {
        if (this.users.length === 1) {
            this.other = user;
        }
        this.users.push(user);
    }

    public leaveRoom(user: User): void {
        this.users.splice(this.users.indexOf(user), 1);
        if (user.isEqual(this.other)) {
            this.other = undefined;
        }
        if (user.isEqual(this.host)) {
            this.host = undefined;
        }
    }
}