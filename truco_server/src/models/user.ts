import { ObjectId } from 'mongodb';

export default class User {
    constructor(
        public name: string,
        public socketId: string,
        public id?: ObjectId
    ) {}
}