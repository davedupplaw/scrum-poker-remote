import {Message} from './Message';
import {MessageType} from './MessageType';

export class Registration extends Message {
    constructor( private _name: string,
                 private _email: string,
                 private _session: string,
                 private _id: string) {
        super( MessageType.REGISTRATION );
    }

    get name(): string { return this._name; }
    set name(name: string) { this._name = name; }

    get email(): string { return this._email; }
    set email(email: string) {this._email = email; }

    get session(): string { return this._session; }
    set session(session: string) { this._session = session; }

    get id(): string { return this._id; }
    set id(id: string) { this._id = id; }

    static fromJson(message: any) {
        return new Registration( message._name,
                                 message._email,
                                 message._session,
                                 message._id);
    }
}
